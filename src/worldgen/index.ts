import { config } from "../config";
import { createLogger } from "../log";
import { createTerrain } from "../state/terrain";
import { TerrainRegistry } from "../state/terrain/registry";
import { createLookup } from "../state/history/lookup";
import { Artifact, Being, Dialect, Region, History } from "../state/history";

export function initHistory(): History {
  const terrainRegistry: TerrainRegistry = [];
  createTerrain(
    config.worldWidth * config.terrainResolution,
    config.worldHeight * config.terrainResolution,
    terrainRegistry
  );
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
    artifacts: createLookup<Artifact>(),
    log: createLogger(0),
    tick: 0,
    world: null,
    terrainRegistry,
    availableActions: [],
  };
}

export function commaSeparate(values: string[]) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, values.length - 1).join(", ")} and ${
    values[values.length - 1]
  }`;
}
