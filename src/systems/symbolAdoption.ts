import { randomChoice } from "../utils/random";
import { config } from "../config";
import {
  CurrentAdoptSymbolActivity,
  getBeingsByActivity,
  History,
} from "../history";
import { updateBeingActions } from "../decision/factories";

export function runSymbolAdoption(history: History) {
  const beings = getBeingsByActivity(history.beings, "adoptSymbol");
  beings.forEach((being) => {
    const activity = being.currentActivity as CurrentAdoptSymbolActivity;
    if (activity.timeLeft === undefined) {
      history.log(
        `[[${being.name}]] started adopting a symbol`,
        [being.id],
        being.location ? [being.location] : [],
        []
      );
      activity.timeLeft = Math.round(Math.random() * 10);
    } else {
      activity.timeLeft--;
      if (activity.timeLeft >= 0) {
        return;
      }
      being.motif = {
        kind: "symbol",
        value: randomChoice(config.motifs).name,
      };
      history.log(
        `[[${being.name}]] adopted the ${being.motif?.value} as their symbol`,
        [being.id],
        being.location ? [being.location] : [],
        []
      );
      being.currentActivity = undefined;
      updateBeingActions(being);
    }
  });
}
