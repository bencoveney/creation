import { Being } from "../history";
import { Tile } from "../world";
import { Needs } from "./need";

export type BeingAction = {
  kind: "being";
  action: "giveArtifact" | "adoptSymbol" | "rest" | "conversation";
  satisfies: keyof Needs;
  target: Being;
  requires: {
    holding?: boolean;
    owner?: "different" | "same";
  };
};

export type TileAction = {
  kind: "tile";
  action:
    | "travel"
    | "discover"
    | "createArtifact"
    | "conversation"
    | "createArchitecture";
  satisfies: keyof Needs;
  location: Tile;
  target?: Being;
  requires: {
    location?: "different" | "same";
    motif?: "present" | "missing";
  };
};

export type Action = BeingAction | TileAction;

export type HasAvailableActions<T extends Action = Action> = {
  availableActions: T[];
};

export function actionBroadcast<T extends Action = Action>(
  hasActions: HasAvailableActions<T>,
  ...toAdd: T[]
): void {
  hasActions.availableActions = hasActions.availableActions.concat(toAdd);
}

export function actionRevoke<T extends Action = Action>(
  hasActions: HasAvailableActions<T>,
  ...toRemove: T[]
): void {
  hasActions.availableActions = hasActions.availableActions.filter((action) =>
    toRemove.includes(action)
  );
}

export function actionTileRevokeWhere(
  hasActions: HasAvailableActions<TileAction>,
  action: TileAction["action"],
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

export function actionBeingRevokeWhere(
  hasActions: HasAvailableActions<BeingAction>,
  action: BeingAction["action"]
): void {
  hasActions.availableActions = hasActions.availableActions.filter(
    (availableAction) => availableAction.action !== action
  );
}
