import { Being } from "../history";
import { Tile } from "../../worldgen/world";
import { Needs } from "./need";

export type Action = {
  action:
    | "travel"
    | "discover"
    | "rest"
    | "createArtifact"
    | "adoptSymbol"
    | "conversation"
    | "giveArtifact";
  satisfies: keyof Needs;
  location: Tile;
  target?: Being;
  requires: {
    location?: "different" | "same";
    motif?: "present" | "missing";
    holdingArtifact?: boolean;
  };
};

export type HasAvailableActions = {
  availableActions: Action[];
};

export function actionBroadcast(
  hasActions: HasAvailableActions,
  ...toAdd: Action[]
): void {
  hasActions.availableActions = hasActions.availableActions.concat(toAdd);
}

export function actionRevoke(
  hasActions: HasAvailableActions,
  ...toRemove: Action[]
): void {
  hasActions.availableActions = hasActions.availableActions.filter((action) =>
    toRemove.includes(action)
  );
}

export function actionRevokeWhere(
  hasActions: HasAvailableActions,
  action: Action["action"],
  location: Tile,
  target?: Being,
  allowClaim?: boolean
): void {
  const prevLength = hasActions.availableActions.length;
  const filtered = hasActions.availableActions.filter((availableAction) => {
    const actionMatch = availableAction.action === action;
    const locationMatch = availableAction.location === location;
    if (target !== undefined) {
      const targetMatch = availableAction.target === target;
      return !(actionMatch && locationMatch && targetMatch);
    }
    return !(actionMatch && locationMatch);
  });
  if (!allowClaim && prevLength === filtered.length) {
    throw new Error("Expected to revoke something");
  }
  hasActions.availableActions = filtered;
}
