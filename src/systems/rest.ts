import { CurrentRestActivity, History, getBeingsByActivity } from "../history";
import { getFromLookup } from "../history/lookup";
import { Tile } from "../world";

export function runRest(history: History) {
  const beings = getBeingsByActivity(history.beings, "rest");
  beings.forEach((being) => {
    const activity = being.currentActivity as CurrentRestActivity;
    const tile = getFromLookup(history.regions, being.location!) as Tile;
    if (activity.timeLeft === undefined) {
      history.log(
        `[[${being.name}]] rested in [[${tile.name}]]`,
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
        `[[${being.name}]] finished resting in [[${tile.name}]]`,
        [being.id],
        [tile.id],
        []
      );
      being.currentActivity = undefined;
    }
  });
}
