import { Tile } from "../../worldgen/world";
import { Needs } from "./need";

export type Action = {
  action: "travel" | "discover" | "rest" | "createArtifact";
  satisfies: keyof Needs;
  location: Tile;
  requires: {
    location?: "different" | "same";
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
  location: Tile
): void {
  hasActions.availableActions = hasActions.availableActions.filter(
    (availableAction) =>
      !(
        availableAction.action === action &&
        availableAction.location === location
      )
  );
}
