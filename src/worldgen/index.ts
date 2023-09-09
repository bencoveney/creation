import { config } from "../config";
import { Logger, createLogger } from "../log";
import { HasAvailableActions } from "../state/decision/action";
import { HasNeeds, Needs } from "../state/decision/need";
import { Preferences } from "../state/decision/preference";
import { createTerrain } from "../state/terrain";
import { TerrainRegistry } from "../state/terrain/registry";
import { Lookup, createLookup } from "../utils/lookup";
import { Language } from "./language";
import { Tile, World } from "./world";

export type Region = {
  id: string;
  name: string;
  tile?: Tile;
  discovered: Boolean;
};

export type Motif = {
  kind: "symbol";
  value: string;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type CurrentMovementActivity = {
  kind: "movement";
  moveToLocation: Coordinate;
  path: Coordinate[];
};
export type CurrentCreateArtifactActivity = {
  kind: "createArtifact";
};
export type CurrentAdoptSymbolActivity = {
  kind: "adoptSymbol";
};

export type CurrentActivity =
  | CurrentMovementActivity
  | CurrentCreateArtifactActivity
  | CurrentAdoptSymbolActivity;

export type Being = HasNeeds & {
  id: string;
  kind: "deity";
  name: string;
  theme?: string;
  location?: string; // Region ID.
  motif?: Motif;
  currentActivity?: CurrentActivity;
  relationships: {
    [being: string]: {
      kind: string;
      encounters: number;
    };
  };
  preferences: Preferences;
};

export type Dialect = {
  id: string;
  language: Language;
};

export type Artifact = {
  id: string;
  name: string;
  object: string;
  creators: string[];
  inPosessionOf: string;
};

export type History = HasAvailableActions & {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  artifacts: Lookup<Artifact>;
  log: Logger;
  tick: number;
  world: null | World;
  terrainRegistry: TerrainRegistry;
};

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
