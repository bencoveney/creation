import { Artifact, Being, History, getDeitiesByActivity } from "../history";
import { randomChoice } from "../utils/random";
import { Lookup, getFromLookup } from "../history/lookup";
import { config } from "../config";
import { updateArtifactCreatedTileActions } from "../decision/factories";
import { Tile } from "../world";

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
  const deities = getDeitiesByActivity(history.beings, "createArtifact");
  deities.forEach((deity) => {
    const artifact = createArtifact([deity], history.artifacts);
    const tile = getFromLookup(history.regions, deity.location!) as Tile;
    history.log(
      `[[${deity.name}]] created the ${artifact.object} [[${artifact.name}]] in [[${tile.name}]]`,
      [deity.id],
      [tile.id],
      [artifact.id]
    );
    deity.holding.push(artifact.id);
    deity.currentActivity = undefined;
    updateArtifactCreatedTileActions(history, tile);
  });
}
