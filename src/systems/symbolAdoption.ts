import { randomChoice } from "../utils/random";
import { config } from "../config";
import { getBeingsByActivity, History } from "../history";
import { updateBeingActions } from "../decision/factories";

export function runSymbolAdoption(history: History) {
  const beings = getBeingsByActivity(history.beings, "adoptSymbol");
  beings.forEach((being) => {
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
  });
}
