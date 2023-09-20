import {
  Artifact,
  Being,
  CurrentCreateArtifactActivity,
  History,
  getBeingsByActivity,
} from "../history";
import { randomChoice } from "../utils/random";
import { Lookup, getFromLookup } from "../history/lookup";
import { config } from "../config";
import {
  updateArtifactCreatedTileActions,
  updateBeingActions,
} from "../decision/factories";
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
  const beings = getBeingsByActivity(history.beings, "createArtifact");
  beings.forEach((being) => {
    const activity = being.currentActivity as CurrentCreateArtifactActivity;
    const tile = getFromLookup(history.regions, being.location!) as Tile;
    if (activity.timeLeft === undefined) {
      history.log(
        `[[${being.name}]] started forging an artifact in [[${tile.name}]]`,
        [being.id],
        [tile.id],
        []
      );
      activity.timeLeft = Math.round(Math.random() * 10);
      updateArtifactCreatedTileActions(history, tile);
    } else {
      activity.timeLeft--;
      if (activity.timeLeft >= 0) {
        return;
      }
      const artifact = createArtifact([being], history.artifacts);
      history.log(
        `[[${being.name}]] created the ${artifact.object} [[${artifact.name}]] in [[${tile.name}]]`,
        [being.id],
        [tile.id],
        [artifact.id]
      );
      being.holding.push(artifact.id);
      being.currentActivity = undefined;
      updateBeingActions(being);
    }
  });
}
