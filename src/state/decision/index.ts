import { config } from "../../config";
import { inverseLerp } from "../../utils/maths";
import { Being } from "../../worldgen";
import { euclidianDistance, Tile } from "../../worldgen/world";
import { Action } from "./action";

const maxDistance = euclidianDistance(
  { x: 0, y: 0 } as any,
  { x: config.worldWidth, y: config.worldHeight } as any
);
export function getHighestPriorityAction(
  actions: Action[],
  being: Being,
  from: Tile
) {
  const { needs, preferences } = being;
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
