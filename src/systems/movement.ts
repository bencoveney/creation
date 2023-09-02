import { createTileRegion, getDeities } from "../worldgen/populate";
import { Being, History, Region } from "../worldgen";
import { Tile, getTile } from "../worldgen/world";
import { getFromLookup, getFromLookupSafe } from "../utils/lookup";

export function runMovement(history: History) {
  const deities = getDeities(history.beings);
  deities.forEach((deity) => {
    if (deity.currentActivity) {
      const previous = getFromLookupSafe(history.regions, deity.location);
      const path = deity.currentActivity.path;
      if (path.length === 0) {
        console.error("weird");
      } else if (path.length === 1) {
        // Already here. We are probably entering the world, otherwise we'd have a start/end.
        // Maybe it would be simpler to have a different category of activity for that.
        const targetTile = getTile(history.world!, path[0].x, path[0].y);
        discoverLocation(deity, targetTile, history);
        const target = getFromLookup(history.regions, targetTile.location);
        deity.location = target.id;
        history.log(`[[${deity.name}]] completed their journey`);
        deity.currentActivity = undefined;
      } else {
        path.shift();
        const targetTile = getTile(history.world!, path[0].x, path[0].y);
        moveToLocation(deity, targetTile, history, previous);
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
  const target = getFromLookup(history.regions, targetTile.location);
  deity.location = target.id;
  if (previous) {
    history.log(
      `[[${deity.name}]] moved from [[${previous.name}]] to [[${target.name}]]`
    );
  } else {
    history.log(`[[${deity.name}]] entered the world in [[${target.name}]]`);
  }
}

function discoverLocation(deity: Being, targetTile: Tile, history: History) {
  if (targetTile.location) {
    return;
  }
  const region = createTileRegion(history.regions, targetTile);
  const regionNameParts = region.name
    .split(" ")
    .map((part) => `[[${part}]]`)
    .join(" ");
  history.log(`[[${deity.name}]] discovered the region of ${regionNameParts}`);
  deity.location = region.id;
}
