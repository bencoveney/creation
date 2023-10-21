import {
  RestActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";
import { Being, History } from "../history";
import { getFromLookup } from "../history/lookup";
import { Tile } from "../world";

export function runRest(history: History) {
  forEachBeingByActivity(history, "rest", rest);
}

function rest(history: History, being: Being, activity: RestActivity) {
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.id}]] rested in [[${tile.id}]]`,
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
    history.log(
      `[[${being.id}]] finished resting in [[${tile.id}]]`,
      [being.id],
      [tile.id],
      []
    );
    completeActivity(being);
  }
}
