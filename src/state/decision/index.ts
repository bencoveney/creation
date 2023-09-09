import { config } from "../../config";
import { inverseLerp } from "../../utils/maths";
import { euclidianDistance, Tile } from "../../worldgen/world";
import { Action } from "./action";
import { Needs } from "./need";
import { Preferences } from "./preference";

const maxDistance = euclidianDistance(
  { x: 0, y: 0 } as any,
  { x: config.worldWidth, y: config.worldHeight } as any
);
export function getHighestPriorityAction(
  actions: Action[],
  needs: Needs,
  preferences: Preferences,
  from: Tile
) {
  const filteredActions = actions.filter((action) => {
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
    return true;
  });
  const prioritisedActions = filteredActions.sort((a, b) => {
    const aNeed = 1 - needs[a.satisfies].currentValue;
    const bNeed = 1 - needs[b.satisfies].currentValue;
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
    return (
      bNeed * preferences[b.action] * bDistance -
      aNeed * preferences[a.action] * aDistance
    );
  });
  return prioritisedActions[0];
}
