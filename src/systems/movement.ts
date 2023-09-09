import { getDeitiesByActivity } from "../worldgen/populate";
import {
  Being,
  Coordinate,
  CurrentMovementActivity,
  History,
  Region,
} from "../worldgen";
import { Tile } from "../worldgen/world";
import { getFromLookupSafe } from "../utils/lookup";
import { array2dGet } from "../utils/array2d";
import {
  updateBeingEnteredTileActions,
  updateBeingExitedTileActions,
  updateDiscoveredTileActions,
} from "../state/decision/factories";

export function runMovement(history: History) {
  const deities = getDeitiesByActivity(history.beings, "movement");
  deities.forEach((deity) => {
    // TODO: if/else can be restructured
    const previous = getFromLookupSafe(history.regions, deity.location) as Tile;
    if (previous) {
      updateBeingExitedTileActions(history, previous, deity);
    }
    const path = (deity.currentActivity as CurrentMovementActivity).path;
    if (path.length === 0) {
      throw new Error("what");
    }
    const next = path.pop() as Coordinate;
    const target = array2dGet(history.world!, next.x, next.y);
    moveToLocation(deity, target, history, previous);
    deity.location = target.id;
    updateBeingEnteredTileActions(history, target, deity);
    if (path.length === 0) {
      history.log(`[[${deity.name}]] completed their journey`);
      deity.currentActivity = undefined;
    }
  });
}

function moveToLocation(
  deity: Being,
  targetTile: Tile,
  history: History,
  previous?: Region
) {
  discoverLocation(deity, targetTile, history);
  deity.location = targetTile.id;
  if (previous) {
    history.log(
      `[[${deity.name}]] moved from [[${previous.name}]] to [[${targetTile.name}]]`
    );
  } else {
    history.log(
      `[[${deity.name}]] entered the world in [[${targetTile.name}]]`
    );
  }
}

// Triggered whenever a deity enters a tile
function discoverLocation(deity: Being, targetTile: Tile, history: History) {
  if (targetTile.discovered) {
    return;
  }
  targetTile.discovered = true;
  updateDiscoveredTileActions(history, targetTile);
  const regionNameParts = targetTile.name
    .split(" ")
    .map((part) => `[[${part}]]`)
    .join(" ");
  history.log(`[[${deity.name}]] discovered the region of ${regionNameParts}`);
  deity.location = targetTile.id;
}
