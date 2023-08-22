import { Lookup, createLookup } from "../utils/lookup";
import { randomChoices, shuffle } from "../utils/random";
import { Language } from "./language";
import {
  createArtifact,
  createDeity,
  createTileRegion,
  createWorld,
  getDeities,
  getSymbol,
} from "./populate";
import { World, createWorld as createWorld2, getTile } from "./world";

export type Region = {
  id: string;
  name: string;
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

export type History = {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  artifacts: Lookup<Artifact>;
  log: string[];
  tick: number;
  world: null | World;
};

export function initHistory(): History {
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
    artifacts: createLookup<Artifact>(),
    log: [],
    tick: 0,
    world: null,
  };
}

let toDoList: Array<() => void> = [];

export function tick(history: History) {
  history.tick++;
  if (getDeities(history.beings).length === 0) {
    let created: Being[] = [];
    for (let i = 0; i < 4; i++) {
      created.push(createDeity(history.beings));
    }
    history.log.push(
      `In the year ${history.tick} ${commaSeparate(
        created.map((c) => `[[${c.name}]]`)
      )} woke from their slumber.`
    );
  } else if (history.regions.map.size === 0) {
    const worldRegion = createWorld(history.regions);
    const deityNames = commaSeparate(
      getDeities(history.beings).map((being) => `[[${being.name}]]`)
    );
    history.log.push(
      `In the year ${history.tick} ${deityNames} forged the world of [[${worldRegion.name}]]`
    );
    // Artifacts
    const deities = getDeities(history.beings);
    const pairings = getPairings(deities);
    pairings.forEach((pairing) =>
      toDoList.push(() => {
        const artifact = createArtifact(pairing, history.artifacts);
        const deityNames = commaSeparate(
          pairing.map((being) => `[[${being.name}]]`)
        );
        history.log.push(
          `In the year ${history.tick} ${deityNames} created the ${artifact.object} [[${artifact.name}]]`
        );
      })
    );
    // Symbols
    deities.forEach((deity) =>
      toDoList.push(() => {
        deity.motif = getSymbol();
        history.log.push(
          `In the year ${history.tick} [[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`
        );
      })
    );
    // Enter world
    deities.forEach((deity) =>
      toDoList.push(() => {
        const region = [...history.regions.map.entries()][0][1];
        deity.location = region.id;
        history.log.push(
          `In the year ${history.tick} [[${deity.name}]] entered [[${region.name}]]`
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
        history.log.push(
          `In the year ${history.tick} the world of [[${worldRegion.name}]] was given form by ${inWorldDeityNames}`
        );
      } else {
        history.log.push(
          `In the year ${history.tick}the world of [[${worldRegion.name}]] was given form`
        );
      }
      history.world?.cells.forEach((tile) => {
        toDoList.push(() => {
          const region = createTileRegion(history.regions);
          history.log.push(
            `In the year ${history.tick} the region ${region.name} was formed`
          );
          tile.location = region.id;
        });
        toDoList = shuffle(toDoList);
      });
    });

    toDoList = shuffle(toDoList);
  } else if (toDoList.length > 0) {
    toDoList.pop()!();
  } else {
    history.log.push(`In the year ${history.tick} nothing happened yet...`);
  }
  // Gods can enter the world
  // Gods can navigate the world
  // Gods can create demigods
  // Gods can shape the world
  // Gods can create species
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
