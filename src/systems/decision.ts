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
//   Else if they don't currently have an action.
//     If they meet the % chance to move somewhere.
//       Pick somewhere and set it as the target location.
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

function getDeityTargetLocation(deity: Being, history: History): string | null {
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
      .map(([x, y]) => getTile(history.world!, x, y))
      .filter((tile) => tile.location);
    possibleTiles.push(...neighbours);
  } else {
    const allTiles = history.world!.cells.filter((tile) => tile.location);
    possibleTiles.push(...allTiles);
  }
  if (possibleTiles.length === 0) {
    console.log("Nowhere can be moved to");
    return null;
  }
  return randomChoice(possibleTiles).location;
}
