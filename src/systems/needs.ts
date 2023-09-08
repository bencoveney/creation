import { updateNeeds } from "../state/decision/need";
import { History } from "../worldgen";
import { getDeities } from "../worldgen/populate";

export function runNeeds(history: History): void {
  getDeities(history.beings).forEach((deity) => updateNeeds(deity.needs));
}
