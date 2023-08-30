import { Being, Region, History } from ".";
import { Lookup } from "../utils/lookup";
import {
  flipCoin,
  randomChoice,
  randomInt,
  randomSelection,
} from "../utils/random";
import { createInitialDeities } from "./deities";
import { generateLanguage } from "./language";
import { Tile } from "./world";

export function populateWorld(history: History): void {
  history.dialects.set({
    language: generateLanguage(),
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

const motifs = randomSelection([
  "cross", // U+271A 	✚ 	Heavy Greek cross
  "triangle", // U+25B2 	▲ 	Black up-pointing triangle
  "circle", // U+25CF 	● 	Black circle
  "square", // U+25FC 	◼ 	Black medium square
  "star", // ⛦
  "ring", // ⌾
  "arrowhead", // U+27A4 	➤ 	Black rightward arrowhead
  "diamond", // ♦
  "cresent", // U+25E0 	◠ 	Upper half circle
  "semicircle", // U+25D6 	◖ 	Left half circle black
  "bar", //  	❙ 	Medium vertical bar
  "need more 1",
  "need more 2",
  "need more 3",
  "need more 4",
  "need more 5",
  "need more 6",
  "need more 7",
  "need more 8",
  "need more 9",
  "need more 10",
  "need more 11",
  "need more 12",
  "need more 13",
  "need more 14",
  "need more 15",
  "need more 16",
  "need more 17",
  "need more 18",
  "need more 19",
]);

export function getSymbol(): Being["motif"] {
  return {
    kind: "symbol",
    value: motifs(),
  };
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
