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

export type Being = {
  id: string;
  name: string;
  power: number;
  location?: string; // Region ID.
  motif?: Motif;
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

export type Logger = {
  log: (...args: any[]) => void;
  tick: number;
  entries: [number, ...string[]][];
};

function createLogger(tick: number): Logger {
  const entries: Logger["entries"] = [];
  const logger: Logger = {
    log: (...args) => {
      entries.push([logger.tick, ...args.map((arg) => arg.toString())]);
    },
    tick,
    entries,
  };
  return logger;
}

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
