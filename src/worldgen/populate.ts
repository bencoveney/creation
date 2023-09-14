import { Being, Region, History, CurrentActivity } from "../state/history";
import { config } from "../config";
import { Lookup, lookupValues } from "../state/history/lookup";
import { createInitialDeities } from "../state/history/deityFactories";
import { generateLanguage } from "../state/language/language";
import { createWorld } from "../state/world";
import { createWorldName } from "../state/language";

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
