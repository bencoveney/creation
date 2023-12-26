import { Being, History } from "../history";
import { getFromLookup, lookupValues } from "../history/lookup";
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
import { artifactFactory } from "../artifact/factory";

export function runArtifactCreation(history: History) {
  forEachBeingByActivity(history, "createArtifact", createArtifact);
}

function createArtifact(
  history: History,
  being: Being,
  activity: CreateArtifactActivity
) {
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.names.defaultKey}]] started forging an artifact in [[${tile.names.defaultKey}]]`,
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
      beingNames.push(`[[${participant.names.defaultKey}]]`);
      beingIds.push(participant.id);
    });
    history.log(
      `${commaSeparate(beingNames)} created the ${artifact.object} [[${
        artifact.names.defaultKey
      }]] in [[${tile.names.defaultKey}]]`,
      beingIds,
      [tile.id],
      [artifact.id]
    );
    updateArtifactCreatedTileActions(history, tile);
  }
}
