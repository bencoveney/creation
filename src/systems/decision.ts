import { getHighestPriorityAction } from "../state/decision";
import { array2dGet } from "../utils/array2d";
import { getFromLookupSafe } from "../utils/lookup";
import { randomChoice } from "../utils/random";
import { Being, Coordinate, History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile, pathfind } from "../worldgen/world";

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
  const availableActions = history.availableActions;
  const availableDeities = deities.filter((deity) => !deity.currentActivity);
  availableDeities.forEach((deity) => {
    const currentLocation = history.world!.values.find(
      (tile) => tile.id === deity.location
    );
    if (currentLocation) {
      const action = getHighestPriorityAction(
        availableActions,
        deity.needs,
        deity.preferences,
        currentLocation
      );

      deity.needs[action.satisfies].currentValue = 1;

      if (action.action === "discover" || action.action === "travel") {
        const targetRegionName = !action.location.discovered
          ? "an unknown land"
          : `[[${action.location.name}]]`;
        history.log(`[[${deity.name}]] set out for ${targetRegionName}`);
        deity.currentActivity = {
          moveToLocation: action.location,
          path: getPathToTargetLocation(deity, action.location, history),
        };
      } else {
        const targetRegionName = !action.location.discovered
          ? "an unknown land"
          : `[[${action.location.name}]]`;
        history.log(`[[${deity.name}]] rested in ${targetRegionName}`);
      }
    } else {
      const targetLocation = getDeityTargetLocation(deity, history);
      if (!targetLocation) {
        return;
      }

      const targetRegionName = !targetLocation.discovered
        ? "an unknown land"
        : `[[${targetLocation.name}]]`;
      history.log(`[[${deity.name}]] set out for ${targetRegionName}`);

      deity.currentActivity = {
        moveToLocation: targetLocation,
        path: getPathToTargetLocation(deity, targetLocation, history),
      };
    }
  });
}

function getDeityTargetLocation(
  deity: Being,
  history: History
): Tile | undefined {
  const possibleTiles: Tile[] = history.world!.values.filter(
    (tile) => tile.id != deity.location
  );
  if (possibleTiles.length === 0) {
    console.log("Nowhere can be moved to");
    return;
  }
  const undiscovered = possibleTiles.filter((tile) => !tile.discovered);
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
  const toTile = array2dGet(world, targetLocation.x, targetLocation.y);
  const path = pathfind(world, fromTile, toTile);
  if (!path || path.length === 0) {
    console.error("weird");
  }
  return path;
}
