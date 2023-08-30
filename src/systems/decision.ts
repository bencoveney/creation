import { randomChoice, rollDice } from "../utils/random";
import { Being, History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile, getTile } from "../worldgen/world";

// Something along these lines.
//
// For each deity in the world:
//   If they are in a location with another deity.
//     If they meet the % chance to do a group activity.
//       Do a group activity
//
// Maybe need a list of goals + pointer to active goal

export function runDecision(history: History) {
  const worldIsReady = !!history.world;
  if (!worldIsReady) {
    return;
  }

  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    if (deity.currentActivity) {
      return;
    }

    const willMove = rollDice(0.2);
    if (!willMove) {
      return;
    }

    const targetLocation = getDeityTargetLocation(deity, history);
    if (targetLocation === null) {
      return;
    }

    deity.currentActivity = {
      moveToLocation: targetLocation,
    };
  });
}

function getDeityTargetLocation(
  deity: Being,
  history: History
): { x: number; y: number } | null {
  const possibleTiles: Tile[] = [];
  if (deity.location) {
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
      )
      .map(([x, y]) => getTile(history.world!, x, y));
    possibleTiles.push(...neighbours);
  } else {
    possibleTiles.push(...history.world!.cells);
  }
  if (possibleTiles.length === 0) {
    console.log("Nowhere can be moved to");
    return null;
  }
  const undiscovered = possibleTiles.filter((tile) => !tile.location);
  if (undiscovered.length > 0) {
    const { x, y } = randomChoice(undiscovered);
    return { x, y };
  } else {
    const { x, y } = randomChoice(possibleTiles);
    return { x, y };
  }
}
