import { randomChoice } from "../utils/random";
import { config } from "../config";
import { Being, History } from "../history";
import { updateBeingActions } from "../decision/factories";
import {
  AdoptSymbolActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";

export function runSymbolAdoption(history: History) {
  forEachBeingByActivity(history, "adoptSymbol", adoptSymbol);
}

function adoptSymbol(
  history: History,
  being: Being,
  activity: AdoptSymbolActivity
) {
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
    completeActivity(being);
    updateBeingActions(being);
  }
}
