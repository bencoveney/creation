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
    createArtifact: createWeakPreference(),
  };
}

export function createDeityNeeds(): Needs {
  return {
    ...createNeeds(),
  };
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
  if (Math.random() > 0.5) {
    actionBroadcast(history, {
      action: "createArtifact",
      satisfies: "create",
      location: tile,
      requires: {
        location: "same",
        motif: "present",
      },
    });
  }
  if (Math.random() > 0.5) {
    actionBroadcast(history, {
      action: "adoptSymbol",
      satisfies: "create",
      location: tile,
      requires: {
        location: "same",
        motif: "missing",
      },
    });
  }
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

export function updateArtifactCreatedTileActions(
  history: History,
  tile: Tile
): void {
  actionRevokeWhere(history, "createArtifact", tile);
}
