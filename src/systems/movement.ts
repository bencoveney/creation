import {
  Being,
  Coordinate,
  CurrentMovementActivity,
  History,
  Region,
  getDeitiesByActivity,
} from "../history";
import { Tile } from "../world";
import { getFromLookupSafe } from "../history/lookup";
import { array2dGet } from "../utils/array2d";
import {
  updateBeingActions,
  updateDiscoveredTileActions,
} from "../decision/factories";

export function runMovement(history: History) {
  const deities = getDeitiesByActivity(history.beings, "movement");
  deities.forEach((deity) => {
    // TODO: if/else can be restructured
    const previous = getFromLookupSafe(history.regions, deity.location) as Tile;
    const path = (deity.currentActivity as CurrentMovementActivity).path;
    if (path.length === 0) {
      throw new Error("what");
    }
    const next = path.pop() as Coordinate;
    const target = array2dGet(history.world!, next.x, next.y);
    moveToLocation(deity, target, history, previous);
    deity.location = target.id;
    if (path.length === 0) {
      history.log(
        `[[${deity.name}]] completed their journey`,
        [deity.id],
        [target.id],
        []
      );
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
      `[[${deity.name}]] moved from [[${previous.name}]] to [[${targetTile.name}]]`,
      [deity.id],
      [targetTile.id],
      []
    );
  } else {
    history.log(
      `[[${deity.name}]] entered the world in [[${targetTile.name}]]`,
      [deity.id],
      [targetTile.id],
      []
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
  history.log(
    `[[${deity.name}]] discovered the region of ${regionNameParts}`,
    [deity.id],
    [targetTile.id],
    []
  );
  deity.location = targetTile.id;
  updateBeingActions(deity);
}
