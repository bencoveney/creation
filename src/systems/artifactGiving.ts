import { updateBeingActions } from "../decision/factories";
import {
  CurrentGiveArtifactActivity,
  History,
  getBeingsByActivity,
} from "../history";
import { getFromLookup } from "../history/lookup";
import { Tile } from "../world";

export function runArtifactGiving(history: History) {
  const beings = getBeingsByActivity(history.beings, "giveArtifact");
  beings.forEach((being) => {
    const activity = being.currentActivity as CurrentGiveArtifactActivity;
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
    being.currentActivity = undefined;
    artifact.inPosessionOf = target.id;
    updateBeingActions(being);
    updateBeingActions(target);
  });
}
