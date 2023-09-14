import { updateNeeds } from "../state/decision/need";
import { History, getDeities } from "../state/history";

export function runNeeds(history: History): void {
  getDeities(history.beings).forEach((deity) => updateNeeds(deity.needs));
}
