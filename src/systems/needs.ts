import { config } from "../config";
import { inverseLerp } from "../utils/maths";
import { History } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { Tile, euclidianDistance } from "../worldgen/world";

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
  strength: number;
  location: Tile;
};

export type HasAvailableActions = {
  availableActions: Action[];
};

export function runNeeds(history: History): void {
  getDeities(history.beings).forEach((deity) => updateNeeds(deity.needs));
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

const maxDistance = euclidianDistance(
  { x: 0, y: 0 } as any,
  { x: config.worldWidth, y: config.worldHeight } as any
);
export function getHighestPriorityAction(
  actions: Action[],
  needs: Needs,
  from: Tile
) {
  const prioritisedActions = [...actions].sort((a, b) => {
    const aNeed = needs[a.satisfies].currentValue;
    const bNeed = needs[b.satisfies].currentValue;
    const aDistance = inverseLerp(
      euclidianDistance(from, a.location),
      maxDistance,
      0
    );
    const bDistance = inverseLerp(
      euclidianDistance(from, b.location),
      maxDistance,
      0
    );
    return bNeed * a.strength * bDistance - aNeed * a.strength * aDistance;
  });
  console.log(
    from,
    prioritisedActions.map((action) => {
      const need = needs[action.satisfies].currentValue;
      const distance = inverseLerp(
        euclidianDistance(from, action.location),
        maxDistance,
        0
      );
      return {
        ...action,
        need,
        distance,
        strength: action.strength,
        needDistance: need * action.strength * distance,
      };
    })
  );
  return prioritisedActions[0];
}
