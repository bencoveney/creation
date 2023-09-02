import { getFromLookup, getFromLookupSafe } from "../utils/lookup";
import { randomChoice, rollDice } from "../utils/random";
import { Being, Coordinate, History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile, getTile, pathfind } from "../worldgen/world";

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
  const availableDeities = deities.filter((deity) => !deity.currentActivity);
  availableDeities.forEach((deity) => {
    const willMove = rollDice(history.config.movementChance);
    if (!willMove) {
      return;
    }

    const targetLocation = getDeityTargetLocation(deity, history);
    if (!targetLocation) {
      return;
    }

    let targetRegionName = "an unknown land";
    if (targetLocation.location) {
      const region = getFromLookup(history.regions, targetLocation.location);
      if (region?.name) {
        targetRegionName = `[[${region.name}]]`;
      }
    }
    history.log(`[[${deity.name}]] set out for ${targetRegionName}`);

    deity.currentActivity = {
      moveToLocation: targetLocation,
      path: getPathToTargetLocation(deity, targetLocation, history),
    };
  });
}

function getDeityTargetLocation(
  deity: Being,
  history: History
): Tile | undefined {
  const possibleTiles: Tile[] = history.world!.cells.filter(
    (tile) => tile.location != deity.location
  );
  if (possibleTiles.length === 0) {
    console.log("Nowhere can be moved to");
    return;
  }
  const undiscovered = possibleTiles.filter((tile) => !tile.location);
  if (undiscovered.length > 0) {
    return randomChoice(undiscovered);
  } else {
    return randomChoice(possibleTiles);
  }
}

function getPathToTargetLocation(
  deity: Being,
  targetLocation: Coordinate,
  history: History
): Coordinate[] {
  const world = history.world;
  if (!world) {
    console.error("weird");
    return [];
  }
  const location = getFromLookupSafe(history.regions, deity.location);
  if (!location || !location.tile) {
    return [targetLocation];
  }
  const fromTile = location.tile;
  const toTile = getTile(world, targetLocation.x, targetLocation.y);
  const path = pathfind(world, fromTile, toTile);
  if (!path || path.length === 0) {
    console.error("weird");
  }
  return path;
}
