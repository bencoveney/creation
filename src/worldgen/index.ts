import { Logger, createLogger } from "../log";
import { Lookup, createLookup } from "../utils/lookup";
import { Language } from "./language";
import { Tile, World } from "./world";

export type Region = {
  id: string;
  name: string;
  tile?: Tile;
};

export type Motif = {
  kind: "symbol";
  value: string;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Being = {
  id: string;
  kind: "deity";
  name: string;
  theme?: string;
  location?: string; // Region ID.
  motif?: Motif;
  currentActivity?: {
    moveToLocation: Coordinate;
    path: Coordinate[];
  };
  relationships: {
    [being: string]: {
      kind: string;
      encounters: number;
    };
  };
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

export type History = {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  artifacts: Lookup<Artifact>;
  log: Logger;
  tick: number;
  world: null | World;
};

export function initHistory(): History {
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
    artifacts: createLookup<Artifact>(),
    log: createLogger(0),
    tick: 0,
    world: null,
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
