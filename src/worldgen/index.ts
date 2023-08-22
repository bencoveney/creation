import { Lookup, createLookup } from "../utils/lookup";
import { randomChoice, randomChoices, shuffle } from "../utils/random";
import { Language } from "./language";
import {
  createArtifact,
  createDeity,
  createTileRegion,
  createWorld,
  getDeities,
  getSymbol,
} from "./populate";
import { Tile, World, createWorld as createWorld2, getTile } from "./world";

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
        toDoList.push(() => {
          deity.location = undefined;
          history.log.push(
            `In the year ${history.tick} [[${deity.name}]] retreated from [[${region.name}]]`
          );
        });
        toDoList = shuffle(toDoList);
      })
    );

    const randomMove = () => {
      const deity = randomChoice(deities);
      if (
        deity.location &&
        history.regions.map.get(deity.location)?.name !== "world_0" &&
        history.world
      ) {
        const location = history.regions.map.get(deity.location)!;
        const neighbours = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]
          .map(([dx, dy]) => [location.tile?.x! + dx, location.tile?.y! + dy])
          .filter(
            ([x, y]) =>
              x > 0 &&
              x < history.world?.width! &&
              y > 0 &&
              y < history.world?.height!
          );
        const [targetX, targetY] = randomChoice(neighbours);
        const targetTile = getTile(history.world!, targetX, targetY);
        const targetLocation = history.regions.map.get(targetTile.location)!;
        deity.location = targetLocation.id;
        history.log.push(
          `In the year ${history.tick} [[${deity.name}]] moved from [[${location.name}]] to [[${targetLocation.name}]]`
        );
      } else if (history.world) {
        deity.location = randomChoice(history.world.cells).location;
        const location = history.regions.map.get(deity.location)!;
        history.log.push(
          `In the year ${history.tick} [[${deity.name}]] moved to [[${location.name}]]`
        );
      } else {
        console.log("Not moving");
        history.log.push(
          `In the year ${history.tick} [[${deity.name}]] rested`
        );
      }
      toDoList.push(randomMove);
      toDoList = shuffle(toDoList);
    };
    toDoList.push(randomMove);

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
          `In the year ${history.tick} the world of [[${worldRegion.name}]] was given form`
        );
      }
      history.world?.cells.forEach((tile) => {
        const region = createTileRegion(history.regions, tile);
        const regionNameParts = region.name
          .split(" ")
          .map((part) => `[[${part}]]`)
          .join(" ");
        toDoList.push(() => {
          history.log.push(
            `In the year ${history.tick} the region ${regionNameParts} was formed`
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
    history.log.push(`In the year ${history.tick} nothing happened`);
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
