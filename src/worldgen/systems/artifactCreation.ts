import { getDeities } from "../populate";
import { Artifact, Being, History, commaSeparate } from "..";
import { randomChoice, randomSelection } from "../../utils/random";
import { Lookup } from "../../utils/lookup";

const artifacts = [
  "sword",
  "shield",
  "dagger",
  "spear",
  "cup",
  "bowl",
  "knife",
  "bracelet",
  "necklace",
  "chain",
  "rope",
  "gown",
  "robe",
  "club",
  "scepter",
  "vial",
  "hood",
  "veil",
  "necklace",
  "eyeglass",
  "map",
];

const artifactSelection = randomSelection(artifacts);

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
export function runArtifactCreationSystem(history: History) {
  if (count >= artifacts.length) {
    return;
  }
  const deities = getDeities(history.beings);
  const locationIds = Array.from(
    new Set(
      deities
        .map((deity) => deity.location)
        .filter<string>((location): location is string => !!location)
        .filter(
          (location) => history.regions.map.get(location)?.name !== "world_0"
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
    if (count >= artifacts.length) {
      return;
    }
    count++;
    const artifact = createArtifact(deitiesAtLocation, history.artifacts);
    const deityNames = commaSeparate(
      deitiesAtLocation.map((being) => `[[${being.name}]]`)
    );
    const locationName = history.regions.map.get(locationId)?.name;
    history.log.log(
      `${deityNames} created the ${artifact.object} [[${artifact.name}]] in [[${locationName}]]`
    );
  });
}
