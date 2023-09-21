import { config } from "../config";
import { inverseLerp } from "../utils/maths";
import { Being, History } from "../history";
import { Tile } from "../world";
import { euclidianDistance } from "../world/pathfind";
import { Action, BeingAction, TileAction } from "./action";
import { lookupValues } from "../history/lookup";

const maxDistance = euclidianDistance(
  { x: 0, y: 0 } as any,
  { x: config.worldWidth, y: config.worldHeight } as any
);

export function getAvailableActions(history: History, tile: Tile) {
  const beingsAtLocation = lookupValues(history.beings).filter(
    (being) => being.location === tile.id
  );
  return (history.availableActions as Action[]).concat(
    beingsAtLocation.map((being) => being.availableActions).flat()
  );
}

export function getHighestPriorityAction(
  actions: Action[],
  being: Being,
  from: Tile
) {
  const { needs, preferences } = being;
  const filteredActions = actions.filter((action) =>
    action.kind === "tile"
      ? filterTileAction(action, from, being)
      : filterBeingAction(action, being)
  );
  const prioritisedActions = filteredActions.sort((a, b) => {
    const aNeed = 1 - needs[a.satisfies].currentValue;
    const bNeed = 1 - needs[b.satisfies].currentValue;
    const aDistance =
      a.kind === "tile"
        ? inverseLerp(euclidianDistance(from, a.location), maxDistance, 0)
        : 1;
    const bDistance =
      b.kind === "tile"
        ? inverseLerp(euclidianDistance(from, b.location), maxDistance, 0)
        : 1;
    return (
      bNeed * preferences[b.action] * bDistance -
      aNeed * preferences[a.action] * aDistance
    );
  });
  return prioritisedActions[0];
}

export function filterTileAction(action: TileAction, from: Tile, being: Being) {
  switch (action.requires.location) {
    case "different":
      if (action.location === from) {
        return false;
      }
      break;
    case "same":
      if (action.location !== from) {
        return false;
      }
      break;
    default:
      break;
  }
  switch (action.requires.motif) {
    case "missing":
      if (being.motif) {
        return false;
      }
      break;
    case "present":
      if (!being.motif) {
        return false;
      }
      break;
    default:
      break;
  }
  if (action.target && action.target.id === being.id) {
    return false;
  }
  return true;
}

export function filterBeingAction(action: BeingAction, being: Being) {
  switch (action.requires.owner) {
    case "different":
      if (action.target === being) {
        return false;
      }
      break;
    case "same":
      if (action.target !== being) {
        return false;
      }
      break;
    default:
      break;
  }
  if (action.requires.holding && being.holding.length === 0) {
    return false;
  }
  // switch (action.requires.motif) {
  //   case "missing":
  //     if (being.motif) {
  //       return false;
  //     }
  //     break;
  //   case "present":
  //     if (!being.motif) {
  //       return false;
  //     }
  //     break;
  //   default:
  //     break;
  // }
  return true;
}
