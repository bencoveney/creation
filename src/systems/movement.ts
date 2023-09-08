import { getDeities } from "../worldgen/populate";
import { Being, History, Region } from "../worldgen";
import { Tile } from "../worldgen/world";
import { getFromLookupSafe } from "../utils/lookup";
import { array2dGet } from "../utils/array2d";
import { updateDiscoveredTileActions } from "../state/decision/factories";

export function runMovement(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    if (deity.currentActivity) {
      const previous = getFromLookupSafe(
        history.regions,
        deity.location
      ) as Tile;
      const path = deity.currentActivity.path;
      if (path.length === 0) {
        console.error("weird");
      } else if (path.length === 1) {
        // Already here. We are probably entering the world, otherwise we'd have a start/end.
        // Maybe it would be simpler to have a different category of activity for that.
        const target = array2dGet(history.world!, path[0].x, path[0].y) as Tile;
        discoverLocation(deity, target, history);
        deity.location = target.id;
        history.log(`[[${deity.name}]] completed their journey`);
        deity.currentActivity = undefined;
        deity.needs.explore.currentValue = 1;
      } else {
        path.shift();
        const target = array2dGet(history.world!, path[0].x, path[0].y);
        moveToLocation(deity, target, history, previous);
      }
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
