import { updateNeeds } from "../decision/need";
import { History, getDeities } from "../history";

export function runNeeds(history: History): void {
  getDeities(history.beings).forEach((deity) => updateNeeds(deity.needs));
}
