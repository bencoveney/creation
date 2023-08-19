import { Lookup, createLookup } from "../utils/lookup";
import { randomChoices, shuffle } from "../utils/random";
import { Language } from "./language";
import {
  createArtifact,
  createDeity,
  createWorld,
  getDeities,
  getSymbol,
} from "./populate";

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
};

export type World = {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  artifacts: Lookup<Artifact>;
  log: string[];
  tick: number;
};

export function initWorld(): World {
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
    artifacts: createLookup<Artifact>(),
    log: [],
    tick: 0,
  };
}

let toDoList: Array<() => void> = [];

export function tickWorld(world: World) {
  world.tick++;
  if (getDeities(world.beings).length === 0) {
    let created: Being[] = [];
    for (let i = 0; i < 4; i++) {
      created.push(createDeity(world.beings));
    }
    world.log.push(
      `In the year ${world.tick} ${commaSeparate(
        created.map((c) => `[[${c.name}]]`)
      )} woke from their slumber.`
    );
  } else if (world.regions.map.size === 0) {
    const worldRegion = createWorld(world.regions);
    const deityNames = commaSeparate(
      getDeities(world.beings).map((being) => `[[${being.name}]]`)
    );
    world.log.push(
      `In the year ${world.tick} ${deityNames} forged the world of [[${worldRegion.name}]]`
    );
    // Artifacts
    const deities = getDeities(world.beings);
    console.log("creating pairings");
    const pairings = getPairings(deities);
    console.log("got pairings", pairings);
    pairings.forEach((pairing) =>
      toDoList.push(() => {
        const artifact = createArtifact(pairing, world.artifacts);
        const deityNames = commaSeparate(
          pairing.map((being) => `[[${being.name}]]`)
        );
        world.log.push(
          `In the year ${world.tick} ${deityNames} created the ${artifact.object} [[${artifact.name}]]`
        );
      })
    );
    // Symbols
    deities.forEach((deity) =>
      toDoList.push(() => {
        deity.motif = getSymbol();
        world.log.push(
          `In the year ${world.tick} [[${deity.name}]] adopted the ${deity.motif?.value} as their symbol`
        );
      })
    );
    toDoList = shuffle(toDoList);
  } else if (toDoList.length > 0) {
    toDoList.pop()!();
  } else {
    world.log.push(`In the year ${world.tick} nothing happened yet...`);
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
  return `${values.slice(0, values.length - 1).join(", ")} and ${
    values[values.length - 1]
  }`;
}
