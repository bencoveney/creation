import { Being, Region, History } from ".";
import { Lookup, lookupValues } from "../utils/lookup";
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
  return lookupValues(beings).filter((being) => being.kind === "deity");
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

let deityNameCount = 0;
function createDeityName(): string {
  return `deity_${deityNameCount++}`;
}
