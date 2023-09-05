import { History } from "../worldgen";
import { randomChoice } from "../utils/random";
import { getDeities } from "../worldgen/populate";
import { config } from "../config";

export function runSymbolAdoption(history: History) {
  const deities = getDeities(history.beings);
  const needSymbol = deities.filter((deity) => !deity.motif);
  if (!needSymbol.length) {
    return;
  }
  const target = randomChoice(needSymbol);
  target.motif = {
    kind: "symbol",
    value: randomChoice(config.motifs).name,
  };
  history.log(
    `[[${target.name}]] adopted the ${target.motif?.value} as their symbol`
  );
}