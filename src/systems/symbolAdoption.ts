import { randomChoice } from "../utils/random";
import { config } from "../config";
import { getDeitiesByActivity, History } from "../history";
import { updateBeingActions } from "../decision/factories";

export function runSymbolAdoption(history: History) {
  const deities = getDeitiesByActivity(history.beings, "adoptSymbol");
  deities.forEach((deity) => {
    deity.motif = {
      kind: "symbol",
      value: randomChoice(config.motifs).name,
    };
    history.log(
      `[[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`,
      [deity.id],
      deity.location ? [deity.location] : [],
      []
    );
    deity.currentActivity = undefined;
    updateBeingActions(deity);
  });
}
