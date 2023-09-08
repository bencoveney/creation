import { History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile } from "../worldgen/world";

export type Need = {
  currentValue: number;
  drainRate: number;
};

export type Needs = {
  socialise: Need;
  create: Need;
  rest: Need;
  explore: Need;
};

export type Action = {
  action: "travel" | "discover";
  satisfies: keyof Needs;
  location: Tile;
};

export type HasAvailableActions = {
  availableActions: Action[];
};

export function runNeeds(history: History): void {
  console.log(history.availableActions);
  getDeities(history.beings).forEach((deity) => updateNeeds(deity.needs));
  // Get deities.
  // For each need:
  // - Reduce by drainRate
}

export function createNeeds(): Needs {
  return {
    socialise: createNeed(),
    create: createNeed(),
    rest: createNeed(),
    explore: createNeed(),
  };
}

function createNeed(): Need {
  return {
    currentValue: Math.random(),
    drainRate: Math.random(),
  };
}

function updateNeeds(needs: Needs) {
  updateNeed(needs.socialise);
  updateNeed(needs.create);
  updateNeed(needs.rest);
  updateNeed(needs.explore);
}

function updateNeed(need: Need) {
  need.currentValue = Math.max(0, need.currentValue - need.drainRate);
}

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
  action: "travel" | "discover",
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
