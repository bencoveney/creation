import { History } from "../worldgen";
import { randomChoice } from "../utils/random";
import { getDeities, getSymbol } from "../worldgen/populate";

export function runSymbolAdoption(history: History) {
  const deities = getDeities(history.beings);
  const needSymbol = deities.filter((deity) => !deity.motif);
  if (!needSymbol.length) {
    return;
  }
  const target = randomChoice(needSymbol);
  target.motif = getSymbol();
  history.log.log(
    `[[${target.name}]] adopted the ${target.motif?.value} as their symbol`
  );
}
