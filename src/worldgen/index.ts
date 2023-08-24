import { Lookup, createLookup } from "../utils/lookup";
import { shuffle } from "../utils/random";
import { Language } from "./language";
import {
  createDeity,
  createTileRegion,
  createWorld,
  getDeities,
  getSymbol,
} from "./populate";
import { Tile, World, createWorld as createWorld2 } from "./world";

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

let toDoList: Array<() => void>;

export function tick(history: History) {
  history.log.tick = history.tick++;
  const deities = getDeities(history.beings);
  if (history.regions.map.size >= 1 && !toDoList) {
    toDoList = [];
    const worldRegion = history.regions.map.values().next().value;
    // Symbols
    deities.forEach((deity) =>
      toDoList.push(() => {
        deity.motif = getSymbol();
        history.log.log(
          `[[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`
        );
      })
    );
    toDoList.push(() => {
      history.world = createWorld2(5, 5);
      const inWorldDeities = deities.filter(
        (d) => d.location === worldRegion.id
      );
      if (inWorldDeities.length > 0) {
        const inWorldDeityNames = commaSeparate(
          inWorldDeities.map((being) => `[[${being.name}]]`)
        );
        history.log.log(
          `the world of [[${worldRegion.name}]] was given form by ${inWorldDeityNames}`
        );
      } else {
        history.log.log(`the world of [[${worldRegion.name}]] was given form`);
      }
      history.world?.cells.forEach((tile) => {
        const region = createTileRegion(history.regions, tile);
        const regionNameParts = region.name
          .split(" ")
          .map((part) => `[[${part}]]`)
          .join(" ");
        toDoList.push(() => {
          history.log.log(`the region ${regionNameParts} was formed`);
          tile.location = region.id;
        });
        toDoList = shuffle(toDoList);
      });
    });

    toDoList = shuffle(toDoList);
  } else if (history.regions.map.size >= 1 && toDoList.length > 0) {
    toDoList.pop()!();
  }
}

export function commaSeparate(values: string[]) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, values.length - 1).join(", ")} and ${
    values[values.length - 1]
  }`;
}
