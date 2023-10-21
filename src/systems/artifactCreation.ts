import { Artifact, Being, History } from "../history";
import { randomChoice } from "../utils/random";
import { Lookup, getFromLookup, lookupValues } from "../history/lookup";
import { config } from "../config";
import {
  updateArtifactCreatedTileActions,
  updateBeingActions,
} from "../decision/factories";
import { Tile } from "../world";
import {
  CreateArtifactActivity,
  completeActivity,
  forEachBeingByActivity,
  getCurrentActivity,
} from "../decision/activity";
import { commaSeparate } from "../utils/string";
import { createNames } from "../language/names";

export function runArtifactCreation(history: History) {
  forEachBeingByActivity(history, "createArtifact", createArtifact);
}

export function artifactFactory(
  creators: Being[],
  artifacts: Lookup<Artifact>
): Artifact {
  const holder = randomChoice(creators);
  const item = randomChoice(config.artifactItems);
  const artifact = artifacts.set({
    names: createNames(holder.theme!, [item]),
    object: randomChoice(config.artifactItems),
    creators: creators.map((creator) => creator.id),
    inPosessionOf: holder.id,
  });
  holder.holding.push(artifact.id);
  return artifact;
}

let artifactNameCount = 0;
function artifactNameFactory(): string {
  return `artifact_${artifactNameCount++}`;
}

function createArtifact(
  history: History,
  being: Being,
  activity: CreateArtifactActivity
) {
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.id}]] started forging an artifact in [[${tile.id}]]`,
      [being.id],
      [tile.id],
      []
    );
    activity.timeLeft = Math.round(Math.random() * 10);
  } else {
    activity.timeLeft--;
    if (activity.timeLeft >= 0) {
      return;
    }
    const otherBeings = lookupValues(history.beings).filter((other) => {
      const otherActivity = getCurrentActivity(other);
      if (
        otherActivity?.kind === "joined" &&
        otherActivity.activity === activity
      ) {
        return true;
      }
      return false;
    });
    const allBeings = [being, ...otherBeings.map((other) => other)];
    const artifact = artifactFactory(allBeings, history.artifacts);
    const beingIds: string[] = [];
    const beingNames: string[] = [];
    allBeings.forEach((participant) => {
      completeActivity(participant);
      updateBeingActions(participant);
      beingNames.push(`[[${participant.id}]]`);
      beingIds.push(participant.id);
    });
    history.log(
      `${commaSeparate(beingNames)} created the ${artifact.object} [[${
        artifact.id
      }]] in [[${tile.id}]]`,
      beingIds,
      [tile.id],
      [artifact.id]
    );
    updateArtifactCreatedTileActions(history, tile);
  }
}
