import {
  GiveArtifactActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";
import { updateBeingActions } from "../decision/factories";
import { Being, History } from "../history";
import { getFromLookup } from "../history/lookup";
import { Tile } from "../world";

export function runArtifactGiving(history: History) {
  forEachBeingByActivity(history, "giveArtifact", giveArtifact);
}

function giveArtifact(
  history: History,
  being: Being,
  activity: GiveArtifactActivity
) {
  const artifact = getFromLookup(history.artifacts, activity.artifact);
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  const target = getFromLookup(history.beings, activity.target);
  history.log(
    `[[${being.name}]] gifted the ${artifact.object} [[${artifact.name}]] to [[${target.name}]]`,
    [being.id, target.id],
    [tile.id],
    [artifact.id]
  );
  being.holding.splice(being.holding.indexOf(artifact.id), 1);
  target.holding.push(artifact.id);
  completeActivity(being);
  artifact.inPosessionOf = target.id;
  updateBeingActions(being);
  updateBeingActions(target);
}
