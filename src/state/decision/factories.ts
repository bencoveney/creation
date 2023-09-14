import { Being, History } from "../../worldgen";
import { Tile } from "../../worldgen/world";
import { actionBroadcast, actionRevokeWhere } from "./action";
import { Needs, createNeeds } from "./need";
import {
  Preferences,
  createPreferences,
  createStrongPreference,
  createWeakPreference,
} from "./preference";

export function createDeityPreferences(): Preferences {
  return {
    ...createPreferences(),

    adoptSymbol: createStrongPreference(),

    rest: createWeakPreference(),
    createArtifact: createWeakPreference(),
    conversation: createWeakPreference(),
    giveArtifact: createWeakPreference(),
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
  // Allow claim is jank. If 2 beings try to create an artifact in the same place
  // at the same time then they will both try to "claim" and revoke that action.
  actionRevokeWhere(history, "createArtifact", tile, undefined, true);
}

export function updateBeingEnteredTileActions(
  history: History,
  tile: Tile,
  being: Being
): void {
  actionBroadcast(history, {
    action: "conversation",
    satisfies: "socialise",
    location: tile,
    target: being,
    requires: {
      location: "same",
    },
  });
  actionBroadcast(history, {
    action: "giveArtifact",
    satisfies: "socialise",
    location: tile,
    target: being,
    requires: {
      location: "same",
      holdingArtifact: true,
    },
  });
}

export function updateBeingExitedTileActions(
  history: History,
  tile: Tile,
  being: Being
): void {
  actionRevokeWhere(history, "conversation", tile, being);
  actionRevokeWhere(history, "giveArtifact", tile, being);
}
