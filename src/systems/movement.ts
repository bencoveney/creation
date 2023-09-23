import { Being, Coordinate, History, Region } from "../history";
import { Tile } from "../world";
import { getFromLookupSafe } from "../history/lookup";
import { array2dGet } from "../utils/array2d";
import {
  updateBeingActions,
  updateDiscoveredTileActions,
} from "../decision/factories";
import {
  MovementActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";

export function runMovement(history: History) {
  forEachBeingByActivity(history, "movement", movement);
}

function movement(history: History, being: Being, activity: MovementActivity) {
  // TODO: if/else can be restructured
  const previous = getFromLookupSafe(history.regions, being.location) as Tile;
  const path = activity.path;
  if (path.length === 0) {
    throw new Error("what");
  }
  const next = path.pop() as Coordinate;
  const target = array2dGet(history.world!, next.x, next.y);
  moveToLocation(being, target, history, previous);
  being.location = target.id;
  if (path.length === 0) {
    history.log(
      `[[${being.name}]] completed their journey`,
      [being.id],
      [target.id],
      []
    );
    completeActivity(being);
  }
}

function moveToLocation(
  being: Being,
  targetTile: Tile,
  history: History,
  previous?: Region
) {
  discoverLocation(being, targetTile, history);
  being.location = targetTile.id;
  if (previous) {
    history.log(
      `[[${being.name}]] moved from [[${previous.name}]] to [[${targetTile.name}]]`,
      [being.id],
      [targetTile.id],
      []
    );
  } else {
    history.log(
      `[[${being.name}]] entered the world in [[${targetTile.name}]]`,
      [being.id],
      [targetTile.id],
      []
    );
  }
}

// Triggered whenever a being enters a tile
function discoverLocation(being: Being, targetTile: Tile, history: History) {
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
    `[[${being.name}]] discovered the region of ${regionNameParts}`,
    [being.id],
    [targetTile.id],
    []
  );
  being.location = targetTile.id;
  updateBeingActions(being);
}
