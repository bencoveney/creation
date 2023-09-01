import { randomChoice, rollDice } from "../utils/random";
import { Being, Coordinate, History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile, getNeighbouringTiles } from "../worldgen/world";

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

    const willMove = rollDice(history.config.movementChance);
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
): Coordinate | null {
  const possibleTiles: Tile[] = [];
  if (deity.location) {
    const location = history.regions.map.get(deity.location)!;
    const neighbours = getNeighbouringTiles(history.world!, location.tile!);
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
