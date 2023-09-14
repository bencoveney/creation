import { Being, Region, History, CurrentActivity } from "../state/history";
import { config } from "../config";
import {
  createDeityNeeds,
  createDeityPreferences,
} from "../state/decision/factories";
import { Preferences } from "../state/decision/preference";
import { Lookup, lookupValues } from "../state/history/lookup";
import { createInitialDeities } from "./deities";
import { generateLanguage } from "../state/language/language";
import { createWorld } from "./world";
import { createDeityName, createWorldName } from "../state/language/factories";

export function populateWorld(history: History): void {
  history.dialects.set({
    language: generateLanguage(history),
  });
  createWorldRegion(history.regions);
  createInitialDeities(history);
  if (history.regions.map.size >= 1 && !history.world) {
    history.world = createWorld(history, config.worldWidth, config.worldHeight);
  }
}

export function createDeity(beings: Lookup<Being>, theme: string): Being {
  return beings.set({
    kind: "deity",
    name: createDeityName(),
    theme,
    relationships: {},
    needs: createDeityNeeds(),
    preferences: createDeityPreferences(),
    timesChosen: Object.fromEntries(
      Object.entries(createDeityPreferences()).map(([key]) => [key, 0])
    ) as Preferences,
    holding: [],
  });
}

export function getDeities(beings: Lookup<Being>): Being[] {
  return lookupValues(beings).filter((being) => being.kind === "deity");
}

export function getDeitiesByActivity(
  beings: Lookup<Being>,
  kind: CurrentActivity["kind"]
): Being[] {
  return getDeities(beings).filter(
    (being) => being.currentActivity?.kind === kind
  );
}

export function createWorldRegion(regions: Lookup<Region>): Region {
  return regions.set({
    name: createWorldName(),
    discovered: true,
  });
}
