import { History } from "../../worldgen";
import { Tile } from "../../worldgen/world";
import { actionBroadcast, actionRevokeWhere } from "./action";
import { Needs, createNeeds } from "./need";
import {
  Preferences,
  createPreferences,
  createWeakPreference,
} from "./preference";

export function createDeityPreferences(): Preferences {
  return {
    ...createPreferences(),
    travel: createWeakPreference(),
    rest: createWeakPreference(),
  };
}

export function createDeityNeeds(): Needs {
  return createNeeds();
}

export function updateInitialTileActions(history: History, tile: Tile): void {
  actionBroadcast(history, {
    action: "discover",
    satisfies: "explore",
    location: tile,
    requires: {
      location: "different",
    },
  });
  actionBroadcast(history, {
    action: "rest",
    satisfies: "rest",
    location: tile,
    requires: {
      location: "same",
    },
  });
}

export function updateDiscoveredTileActions(
  history: History,
  tile: Tile
): void {
  actionBroadcast(history, {
    action: "travel",
    satisfies: "explore",
    location: tile,
    requires: {
      location: "different",
    },
  });
  actionRevokeWhere(history, "discover", tile);
}
