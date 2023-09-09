import { getDeities } from "../worldgen/populate";
import { Artifact, Being, History } from "../worldgen";
import { randomChoice } from "../utils/random";
import { Lookup, getFromLookup } from "../utils/lookup";
import { config } from "../config";
import { updateArtifactCreatedTileActions } from "../state/decision/factories";
import { Tile } from "../worldgen/world";

export function createArtifact(
  creators: Being[],
  artifacts: Lookup<Artifact>
): Artifact {
  return artifacts.set({
    name: createArtifactName(),
    object: randomChoice(config.artifactItems),
    creators: creators.map((creator) => creator.id),
    inPosessionOf: randomChoice(creators.map((creator) => creator.id)),
  });
}

let artifactNameCount = 0;
function createArtifactName(): string {
  return `artifact_${artifactNameCount++}`;
}

export function runArtifactCreation(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    if (deity.currentActivity?.kind === "createArtifact") {
      const artifact = createArtifact([deity], history.artifacts);
      const deityNames = `[[${deity.name}]]`;
      const tile = getFromLookup(history.regions, deity.location!) as Tile;
      history.log(
        `${deityNames} created the ${artifact.object} [[${artifact.name}]] in [[${tile.name}]]`
      );
      deity.currentActivity = undefined;
      updateArtifactCreatedTileActions(history, tile);
    }
  });
}
