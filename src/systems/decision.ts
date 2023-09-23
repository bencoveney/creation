import { getAvailableActions, getHighestPriorityAction } from "../decision";
import { array2dGet } from "../utils/array2d";
import { getFromLookupSafe, lookupValues } from "../history/lookup";
import { randomChoice } from "../utils/random";
import { Being, Coordinate, History } from "../history";
import { Tile } from "../world";
import { pathfind } from "../world/pathfind";
import { BeingAction, TileAction } from "../decision/action";
import {
  ConversationActivity,
  GiveArtifactActivity,
  hasActivity,
  setCurrentActivity,
} from "../decision/activity";

export function runDecision(history: History) {
  const worldIsReady = !!history.world;
  if (!worldIsReady) {
    return;
  }

  const beings = lookupValues(history.beings);
  for (let beingIndex = 0; beingIndex < beings.length; beingIndex++) {
    const being = beings[beingIndex];
    if (hasActivity(being)) {
      continue;
    }
    const currentLocation = history.world!.values.find(
      (tile) => tile.id === being.location
    );
    if (!currentLocation) {
      doEntryAction(history, being);
      continue;
    }
    const availableActions = getAvailableActions(history, currentLocation);
    const action = getHighestPriorityAction(
      availableActions,
      being,
      currentLocation
    );

    being.timesChosen[action.action]++;

    switch (action.kind) {
      case "tile":
        doTileAction(history, being, currentLocation, action);
        break;
      case "being":
        doBeingAction(history, being, currentLocation, action);
        break;
    }
  }
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
    setCurrentActivity(being, {
      kind: "movement",
      moveToLocation: action.location,
      path: getPathToTargetLocation(being, action.location, history),
      interruptable: false,
      satisfies: action.satisfies,
    });
    locationIds.push(action.location.id);
  } else if (action.action === "createArtifact") {
    setCurrentActivity(being, {
      kind: "createArtifact",
      interruptable: true,
      satisfies: action.satisfies,
    });
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
  const artifactIds: string[] = [];

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
    const giveArtifact: GiveArtifactActivity = {
      kind: "giveArtifact",
      target: action.target.id,
      artifact: artifact,
      interruptable: false,
      satisfies: action.satisfies,
    };
    setCurrentActivity(being, giveArtifact);
    setCurrentActivity(action.target, {
      kind: "joined",
      target: being.id,
      activity: giveArtifact,
      interruptable: false,
      satisfies: action.satisfies,
    });
    beingIds.push(action.target.id);
    artifactIds.push(artifact);
  } else if (action.action === "adoptSymbol") {
    setCurrentActivity(being, {
      kind: "adoptSymbol",
      interruptable: true,
      satisfies: action.satisfies,
    });
  } else if (action.action === "conversation") {
    if (!action.target) {
      console.error("what");
      return;
    }
    const conversation: ConversationActivity = {
      kind: "conversation",
      target: action.target.id,
      interruptable: false,
      satisfies: action.satisfies,
    };
    setCurrentActivity(being, conversation);
    setCurrentActivity(action.target, {
      kind: "joined",
      target: being.id,
      activity: conversation,
      interruptable: false,
      satisfies: action.satisfies,
    });
    beingIds.push(action.target.id);
  } else if (action.action === "rest") {
    setCurrentActivity(being, {
      kind: "rest",
      interruptable: true,
      satisfies: action.satisfies,
    });
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
  setCurrentActivity(being, {
    kind: "movement",
    moveToLocation: targetLocation,
    path: getPathToTargetLocation(being, targetLocation, history),
    interruptable: false,
    satisfies: "explore",
  });
}

function getRegionName(tile: Tile) {
  return !tile.discovered ? "an unknown land" : `[[${tile.name}]]`;
}
