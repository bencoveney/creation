import { Being, History, commaSeparate } from "..";
import { createDeity, createWorld, getDeities } from "../populate";

const activities: Array<(history: History) => void> = [
  (history) => {
    let created: Being[] = [];
    for (let i = 0; i < history.config.deityCount; i++) {
      created.push(createDeity(history.beings));
    }
    history.log.log(
      `${commaSeparate(
        created.map((c) => `[[${c.name}]]`)
      )} woke from their slumber.`
    );
  },
  (history) => {
    const deities = getDeities(history.beings);
    const worldRegion = createWorld(history.regions);
    const deityNames = commaSeparate(
      deities.map((being) => `[[${being.name}]]`)
    );
    history.log.log(
      `${deityNames} forged the world of [[${worldRegion.name}]]`
    );
  },
];

export function runDeityCreation(history: History) {
  if (activities.length) {
    const toDo = activities.shift()!;
    toDo(history);
  }
}
