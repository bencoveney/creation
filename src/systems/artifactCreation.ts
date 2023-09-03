import { getDeities } from "../worldgen/populate";
import { Artifact, Being, History, commaSeparate } from "../worldgen";
import { randomChoice, randomSelection } from "../utils/random";
import { Lookup, getFromLookup } from "../utils/lookup";
import { config } from "../config";

let artifactSelection: () => string;

export function createArtifact(
  creators: Being[],
  artifacts: Lookup<Artifact>
): Artifact {
  return artifacts.set({
    name: createArtifactName(),
    object: artifactSelection(),
    creators: creators.map((creator) => creator.id),
    inPosessionOf: randomChoice(creators.map((creator) => creator.id)),
  });
}

let artifactNameCount = 0;
function createArtifactName(): string {
  return `artifact_${artifactNameCount++}`;
}

let count = 0;
export function runArtifactCreation(history: History) {
  if (!artifactSelection) {
    artifactSelection = randomSelection(config.artifactItems);
  }
  if (count >= config.artifactItems.length) {
    return;
  }
  const deities = getDeities(history.beings);
  const locationIds = Array.from(
    new Set(
      deities
        .map((deity) => deity.location)
        .filter<string>((location): location is string => !!location)
        .filter(
          (location) =>
            getFromLookup(history.regions, location)?.name !== "world_0"
        )
    )
  );
  locationIds.forEach((locationId) => {
    const deitiesAtLocation = deities.filter(
      (deity) => deity.location === locationId
    );
    if (deitiesAtLocation.length < 2) {
      return;
    }
    if (count >= config.artifactItems.length) {
      return;
    }
    count++;
    const artifact = createArtifact(deitiesAtLocation, history.artifacts);
    const deityNames = commaSeparate(
      deitiesAtLocation.map((being) => `[[${being.name}]]`)
    );
    const locationName = getFromLookup(history.regions, locationId)?.name;
    history.log(
      `${deityNames} created the ${artifact.object} [[${artifact.name}]] in [[${locationName}]]`
    );
  });
}
