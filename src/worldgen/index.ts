import { Lookup, createLookup } from "../utils/lookup";
import { shuffle } from "../utils/random";
import { Language } from "./language";
import {
  createArtifact,
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

let toDoList: Array<() => void> = [];

export function tick(history: History) {
  history.log.tick = history.tick++;
  const deities = getDeities(history.beings);
  if (deities.length === 0) {
    let created: Being[] = [];
    for (let i = 0; i < 4; i++) {
      created.push(createDeity(history.beings));
    }
    history.log.log(
      `${commaSeparate(
        created.map((c) => `[[${c.name}]]`)
      )} woke from their slumber.`
    );
  } else if (history.regions.map.size === 0) {
    const worldRegion = createWorld(history.regions);
    const deityNames = commaSeparate(
      deities.map((being) => `[[${being.name}]]`)
    );
    history.log.log(
      `${deityNames} forged the world of [[${worldRegion.name}]]`
    );
    // Artifacts
    const pairings = getPairings(deities);
    pairings.forEach((pairing) =>
      toDoList.push(() => {
        const artifact = createArtifact(pairing, history.artifacts);
        const deityNames = commaSeparate(
          pairing.map((being) => `[[${being.name}]]`)
        );
        history.log.log(
          `${deityNames} created the ${artifact.object} [[${artifact.name}]]`
        );
      })
    );
    // Symbols
    deities.forEach((deity) =>
      toDoList.push(() => {
        deity.motif = getSymbol();
        history.log.log(
          `[[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`
        );
      })
    );
    // Enter world
    deities.forEach((deity) =>
      toDoList.push(() => {
        const region = [...history.regions.map.entries()][0][1];
        deity.location = region.id;
        history.log.log(`[[${deity.name}]] entered [[${region.name}]]`);
        toDoList.push(() => {
          deity.location = undefined;
          history.log.log(
            `[[${deity.name}]] retreated from [[${region.name}]]`
          );
        });
        toDoList = shuffle(toDoList);
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
  } else if (toDoList.length > 0) {
    toDoList.pop()!();
  }
}

function getPairings<T>(values: T[]): [T, T][] {
  let result: [T, T][] = [];
  for (let first = 0; first < values.length - 1; first++) {
    for (let second = first + 1; second < values.length; second++) {
      result.push([values[first], values[second]]);
    }
  }
  return result;
}

function commaSeparate(values: string[]) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, values.length - 1).join(", ")} and ${
    values[values.length - 1]
  }`;
}
