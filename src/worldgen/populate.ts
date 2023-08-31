import { Being, Region, History } from ".";
import { Lookup } from "../utils/lookup";
import { flipCoin, randomChoice, randomInt } from "../utils/random";
import { createInitialDeities } from "./deities";
import { generateLanguage } from "./language";
import { Tile } from "./world";

export function populateWorld(history: History): void {
  history.dialects.set({
    language: generateLanguage(history),
  });
  createWorld(history.regions);
  createInitialDeities(history);
}

export function createDeity(beings: Lookup<Being>, theme: string): Being {
  return beings.set({
    kind: "deity",
    name: createDeityName(),
    theme,
  });
}

export function getDeities(beings: Lookup<Being>): Being[] {
  return [...beings.map.values()].filter((being) => being.kind === "deity");
}

export function createWorld(regions: Lookup<Region>): Region {
  return regions.set({
    name: createWorldName(),
  });
}

export function createTileRegion(regions: Lookup<Region>, tile: Tile): Region {
  const result = regions.set({
    name: createRegionName(),
    tile,
  });
  tile.location = result.id;
  return result;
}

const regionPlaces = [
  "woods",
  "halls",
  "cliffs",
  "forest",
  "plains",
  "tundras",
  "mountains",
  "streets",
];

const regionVibes = [
  "sorrow",
  "elation",
  "tranquility",
  "peace",
  "strife",
  "anger",
  "fear",
  "calm",
];

const regionAdjectives = [
  "windy",
  "calm",
  "frozen",
  "windswept",
  "sunny",
  "tranquil",
  "undead",
  "barren",
];

const settlementNameStarts = [
  "ply",
  "exe",
  "tor",
  "paign",
  "ex",
  "barn",
  "ton",
  "tiver",
  "brix",
  "bide",
  "teign",
  "sid",
  "dawl",
  "tavi",
  "north",
  "ivy",
];

const settlementNameEnds = [
  "mouth",
  "ter",
  "quay",
  "ton",
  "staple",
  "ton abbot",
  "ham",
  "ford",
  "ish",
  "stock",
  "bridge",
];

function describeNoun(nouns: string[], adjectices: string[]) {
  return flipCoin()
    ? randomChoice(nouns)
    : `${randomChoice(adjectices)} ${randomChoice(nouns)}`;
}

let worldNameCount = 0;
function createWorldName(): string {
  return `world_${worldNameCount++}`;
}

function createRegionName(): string {
  const mode = randomInt(0, 3);
  switch (mode) {
    case 0:
      return `the ${describeNoun(regionPlaces, regionAdjectives)}`;
    case 1:
      return `the ${describeNoun(
        regionPlaces,
        regionAdjectives
      )} of ${randomChoice(regionVibes)}`;
    case 2:
      // Syllables
      return `${randomChoice(settlementNameStarts)}${randomChoice(
        settlementNameEnds
      )}`;
    default:
      return "default";
  }
}

const firstNames = [
  "alex",
  "brook",
  "charlie",
  "frankie",
  "gabriel",
  "jesse",
  "sam",
  "taylor",
];

// https://en.wikipedia.org/wiki/List_of_most_common_surnames_in_Europe#United_Kingdom
const secondNames = [
  "smith",
  "jones",
  "taylor",
  "brown",
  "williams",
  "wilson",
  "johnson",
  "davies",
  "robinson",
  "wright",
  "thompson",
  "evans",
  "walker",
  "white",
  "roberts",
  "green",
  "hall",
  "wood",
  "jackson",
  "clark",
];
const professionNames = [
  "butcher",
  "farmer",
  "explorer",
  "shopkeeper",
  "innkeeper",
  "cook",
  "shepherd",
  "guard",
  "tailor",
  "hunter",
  "bard",
];
const rankNames = [
  "king",
  "queen",
  "prince",
  "princess",
  "lord",
  "lady",
  "baron",
  "baroness",
];

function createBeingName(): string {
  const mode = randomInt(0, 3);
  console.log("beingMode", mode);
  switch (mode) {
    case 0:
      return `${randomChoice(firstNames)} ${randomChoice(secondNames)}`;
    case 1:
      return `${randomChoice(firstNames)} the ${randomChoice(professionNames)}`;
    case 2:
      return `${randomChoice(rankNames)} ${randomChoice(
        firstNames
      )} ${randomChoice(secondNames)}`;
    default:
      return "default";
  }
}

let deityNameCount = 0;
function createDeityName(): string {
  return `deity_${deityNameCount++}`;
}
