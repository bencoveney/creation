import { History } from "../worldgen";
import { randomChoice } from "../utils/random";
import { getDeities, getDeitiesByActivity } from "../worldgen/populate";
import { config } from "../config";

export function runSymbolAdoption(history: History) {
  const deities = getDeitiesByActivity(history.beings, "adoptSymbol");
  deities.forEach((deity) => {
    deity.motif = {
      kind: "symbol",
      value: randomChoice(config.motifs).name,
    };
    history.log(
      `[[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`
    );
    deity.currentActivity = undefined;
  });
}
