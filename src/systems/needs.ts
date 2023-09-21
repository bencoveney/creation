import { updateNeeds } from "../decision/need";
import { History } from "../history";
import { lookupValues } from "../history/lookup";

export function runNeeds(history: History): void {
  lookupValues(history.beings).forEach((being) => updateNeeds(being.needs));
}
