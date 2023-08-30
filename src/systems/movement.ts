import { getDeities } from "../worldgen/populate";
import { History } from "../worldgen";

export function runMovement(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    const rollDice = Math.random() > history.config.noMovementChance;
    if (!rollDice) {
      return;
    }
    if (deity.currentActivity?.moveToLocation) {
      const previous =
        deity.location && history.regions.map.get(deity.location);
      const target = history.regions.map.get(
        deity.currentActivity?.moveToLocation
      )!;
      deity.location = target.id;
      deity.currentActivity = undefined;
      if (previous) {
        history.log.log(
          `[[${deity.name}]] moved from [[${previous.name}]] to [[${target.name}]]`
        );
      } else {
        history.log.log(
          `[[${deity.name}]] entered the world in [[${target.name}]]`
        );
      }
    }
  });
}
