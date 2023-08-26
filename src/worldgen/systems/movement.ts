import { randomChoice } from "../../utils/random";
import { getDeities } from "../populate";
import { History } from "..";
import { getTile } from "../world";

export function runMovementSystem(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    const deityRegion =
      (deity.location && history.regions.map.get(deity.location)) || undefined;
    const rollDice = Math.random() > history.config.noMovementChance;
    if (!rollDice) {
      return;
    }
    // const rollRetreat = Math.random() > 0.9;
    if (deity.location && deityRegion?.name !== "world_0" && history.world) {
      const location = history.regions.map.get(deity.location)!;
      const neighbours = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
        .map(([dx, dy]) => [location.tile?.x! + dx, location.tile?.y! + dy])
        .filter(
          ([x, y]) =>
            x >= 0 &&
            x < history.world?.width! &&
            y >= 0 &&
            y < history.world?.height!
        );
      const [targetX, targetY] = randomChoice(neighbours);
      const targetTile = getTile(history.world!, targetX, targetY);
      if (!targetTile.location) {
        return;
      }
      const targetLocation = history.regions.map.get(targetTile.location)!;
      deity.location = targetLocation.id;
      history.log.log(
        `[[${deity.name}]] moved from [[${location.name}]] to [[${targetLocation.name}]]`
      );
    } else if (
      deity.location &&
      deityRegion?.name === "world_0" &&
      history.world
    ) {
      const target = randomChoice(history.world.cells).location;
      if (!target) {
        return;
      }
      deity.location = target;
      const location = history.regions.map.get(deity.location)!;
      history.log.log(`[[${deity.name}]] moved to [[${location.name}]]`);
    } else if (!deity.location && history.world) {
      const target = [...history.regions.map.entries()][0][1];
      deity.location = target.id;
      history.log.log(`[[${deity.name}]] entered [[${target.name}]]`);
      // Won't trigger - caughy "move" branch above
      // } else if (deity.location && deityRegion?.name !== "world_0") {
      //   deity.location = undefined;
      //   history.log.log(
      //     `[[${deity.name}]] retreated from [[${deityRegion!.name}]]`
      //   );
    } else {
      // console.log("Not moving");
      // history.log.log(`[[${deity.name}]] rested`);
    }
  });
}
