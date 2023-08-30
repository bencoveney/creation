import { createTileRegion, getDeities } from "../worldgen/populate";
import { History } from "../worldgen";
import { getTile } from "../worldgen/world";

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
      const targetTile = getTile(
        history.world!,
        deity.currentActivity!.moveToLocation.x,
        deity.currentActivity!.moveToLocation.y
      );
      if (!targetTile.location) {
        const region = createTileRegion(history.regions, targetTile);
        const regionNameParts = region.name
          .split(" ")
          .map((part) => `[[${part}]]`)
          .join(" ");
        history.log.log(
          `[[${deity.name}]] discovered the region of ${regionNameParts}`
        );
        deity.location = region.id;
        deity.currentActivity = undefined;
      } else {
        const target = history.regions.map.get(targetTile.location)!;
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
    }
  });
}
