import { config } from "../config";
import { Being, History } from "../history";
import { Tile } from "../world";
import {
  actionBeingRevokeWhere,
  actionBroadcast,
  actionTileRevokeWhere,
} from "./action";
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
    kind: "tile",
    action: "discover",
    satisfies: "explore",
    location: tile,
    requires: {
      location: "different",
    },
  });
  actionBroadcast(history, {
    kind: "tile",
    action: "rest",
    satisfies: "rest",
    location: tile,
    requires: {
      location: "same",
    },
  });
  if (Math.random() > 0.5) {
    actionBroadcast(history, {
      kind: "tile",
      action: "createArtifact",
      satisfies: "create",
      location: tile,
      requires: {
        location: "same",
        motif: "present",
      },
    });
  }
}

export function updateDiscoveredTileActions(
  history: History,
  tile: Tile
): void {
  actionBroadcast(history, {
    kind: "tile",
    action: "travel",
    satisfies: "explore",
    location: tile,
    requires: {
      location: "different",
    },
  });
  actionTileRevokeWhere(history, "discover", tile);
}

export function updateArtifactCreatedTileActions(
  history: History,
  tile: Tile
): void {
  // Allow claim is jank. If 2 beings try to create an artifact in the same place
  // at the same time then they will both try to "claim" and revoke that action.
  actionTileRevokeWhere(history, "createArtifact", tile, undefined, true);
}

export function updateBeingEnteredTileActions(
  history: History,
  tile: Tile,
  being: Being
): void {
  actionBroadcast(history, {
    kind: "tile",
    action: "conversation",
    satisfies: "socialise",
    location: tile,
    target: being,
    requires: {
      location: "same",
    },
  });
}

export function updateBeingExitedTileActions(
  history: History,
  tile: Tile,
  being: Being
): void {
  actionTileRevokeWhere(history, "conversation", tile, being);
}

export function updateBeingActions(being: Being): void {
  // Revoke, and add back if missing.
  // Maybe add some upsert helpers in the future.
  actionBeingRevokeWhere(being, "giveArtifact");
  if (being.holding.length < config.deityHoldingLimit) {
    actionBroadcast(being, {
      kind: "being",
      action: "giveArtifact",
      satisfies: "socialise",
      target: being,
      requires: {
        holding: true,
        owner: "different",
      },
    });
  }
  actionBeingRevokeWhere(being, "adoptSymbol");
  if (!being.motif) {
    actionBroadcast(being, {
      kind: "being",
      action: "adoptSymbol",
      satisfies: "create",
      target: being,
      requires: {
        owner: "same",
      },
    });
  }
}
