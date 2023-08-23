import { randomChoice } from "../../utils/random";
import { getDeities } from "../populate";
import { History } from "..";
import { getTile } from "../world";

export function runMovementSystem(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    const rollDice = Math.random() > 0.6;
    if (
      rollDice &&
      deity.location &&
      history.regions.map.get(deity.location)?.name !== "world_0" &&
      history.world
    ) {
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
      const targetLocation = history.regions.map.get(targetTile.location)!;
      deity.location = targetLocation.id;
      history.log.log(
        `[[${deity.name}]] moved from [[${location.name}]] to [[${targetLocation.name}]]`
      );
    } else if (history.world) {
      deity.location = randomChoice(history.world.cells).location;
      const location = history.regions.map.get(deity.location)!;
      history.log.log(`[[${deity.name}]] moved to [[${location.name}]]`);
    } else {
      // console.log("Not moving");
      // history.log.log(`[[${deity.name}]] rested`);
    }
  });
}
