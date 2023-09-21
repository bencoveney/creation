import { getAvailableActions, getHighestPriorityAction } from "../decision";
import { satisfyNeed } from "../decision/need";
import { array2dGet } from "../utils/array2d";
import { getFromLookupSafe, lookupValues } from "../history/lookup";
import { randomChoice } from "../utils/random";
import { Being, Coordinate, History } from "../history";
import { Tile } from "../world";
import { pathfind } from "../world/pathfind";
import { BeingAction, TileAction } from "../decision/action";

export function runDecision(history: History) {
  const worldIsReady = !!history.world;
  if (!worldIsReady) {
    return;
  }

  const beings = lookupValues(history.beings);
  const availableBeings = beings.filter((being) => !being.currentActivity);
  availableBeings.forEach((being) => {
    const currentLocation = history.world!.values.find(
      (tile) => tile.id === being.location
    );
    if (currentLocation) {
      const availableActions = getAvailableActions(history, currentLocation);
      const action = getHighestPriorityAction(
        availableActions,
        being,
        currentLocation
      );

      satisfyNeed(being, action);
      being.timesChosen[action.action]++;

      switch (action.kind) {
        case "tile":
          doTileAction(history, being, currentLocation, action);
          return;
        case "being":
          doBeingAction(history, being, currentLocation, action);
          return;
      }
    } else {
      doEntryAction(history, being);
    }
  });
}

function pickRandomTargetTile(
  being: Being,
  history: History
): Tile | undefined {
  const possibleTiles: Tile[] = history.world!.values.filter(
    (tile) => tile.id != being.location
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
  being: Being,
  targetLocation: Coordinate,
  history: History
): Coordinate[] {
  const world = history.world;
  if (!world) {
    console.error("weird");
    return [];
  }
  const location = getFromLookupSafe(history.regions, being.location);
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

function doTileAction(
  history: History,
  being: Being,
  currentLocation: Tile,
  action: TileAction
) {
  const locationIds: string[] = [currentLocation.id];
  const beingIds: string[] = [being.id];

  if (action.action === "discover" || action.action === "travel") {
    being.currentActivity = {
      kind: "movement",
      moveToLocation: action.location,
      path: getPathToTargetLocation(being, action.location, history),
    };
    locationIds.push(action.location.id);
  } else if (action.action === "createArtifact") {
    being.currentActivity = {
      kind: "createArtifact",
    };
  }

  history.log(
    `[[${being.name}]] chose action ${action.action} in ${getRegionName(
      currentLocation
    )}`,
    beingIds,
    locationIds,
    []
  );
}

function doBeingAction(
  history: History,
  being: Being,
  currentLocation: Tile,
  action: BeingAction
) {
  const locationIds: string[] = [currentLocation.id];
  const beingIds: string[] = [being.id];

  if (action.action === "giveArtifact") {
    if (!action.target) {
      console.error("what");
      return;
    }
    const artifact = randomChoice(being.holding);
    if (!artifact) {
      console.error("what");
      return;
    }
    being.currentActivity = {
      kind: "giveArtifact",
      target: action.target.id,
      artifact: artifact,
    };
  } else if (action.action === "adoptSymbol") {
    being.currentActivity = {
      kind: "adoptSymbol",
    };
  } else if (action.action === "conversation") {
    if (!action.target) {
      console.error("what");
      return;
    }
    being.currentActivity = {
      kind: "conversation",
      target: action.target.id,
    };
    beingIds.push(action.target.id);
  } else if (action.action === "rest") {
    being.currentActivity = {
      kind: "rest",
    };
  }

  history.log(
    `[[${being.name}]] chose action ${action.action} in ${getRegionName(
      currentLocation
    )}`,
    beingIds,
    locationIds,
    []
  );
}

function doEntryAction(history: History, being: Being) {
  const targetLocation = pickRandomTargetTile(being, history);
  if (!targetLocation) {
    return;
  }
  history.log(
    `[[${being.name}]] set out for ${getRegionName(targetLocation)}`,
    [being.id],
    [targetLocation.id],
    []
  );
  being.currentActivity = {
    kind: "movement",
    moveToLocation: targetLocation,
    path: getPathToTargetLocation(being, targetLocation, history),
  };
}

function getRegionName(tile: Tile) {
  return !tile.discovered ? "an unknown land" : `[[${tile.name}]]`;
}
