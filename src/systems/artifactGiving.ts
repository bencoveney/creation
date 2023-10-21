import {
  GiveArtifactActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";
import { updateBeingActions } from "../decision/factories";
import { Being, History } from "../history";
import { getFromLookup } from "../history/lookup";

export function runArtifactGiving(history: History) {
  forEachBeingByActivity(history, "giveArtifact", giveArtifact);
}

function giveArtifact(
  history: History,
  being: Being,
  activity: GiveArtifactActivity
) {
  const artifact = getFromLookup(history.artifacts, activity.artifact);
  const target = getFromLookup(history.beings, activity.target);
  const tile = getFromLookup(history.regions, being.location!);
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.names.defaultKey}]] started gifing an artifact to [[${target.names.defaultKey}]]`,
      [being.id, target.id],
      [tile.id],
      [artifact.id]
    );
    activity.timeLeft = Math.round(Math.random() * 10);
  } else {
    activity.timeLeft--;
    if (activity.timeLeft >= 0) {
      return;
    }
    history.log(
      `[[${being.names.defaultKey}]] gifted the ${artifact.object} [[${artifact.names.defaultKey}]] to [[${target.names.defaultKey}]]`,
      [being.id, target.id],
      [tile.id],
      [artifact.id]
    );
    being.holding.splice(being.holding.indexOf(artifact.id), 1);
    target.holding.push(artifact.id);
    artifact.inPosessionOf = target.id;
    completeActivity(being);
    updateBeingActions(being);
    completeActivity(target);
    updateBeingActions(target);
  }
}
