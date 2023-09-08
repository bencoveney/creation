import { Being, Region, History } from ".";
import { config } from "../config";
import { createNeeds } from "../systems/needs";
import { Lookup, lookupValues } from "../utils/lookup";
import { flipCoin, randomChoice, randomInt } from "../utils/random";
import { createInitialDeities } from "./deities";
import { generateLanguage } from "./language";
import { Tile, createWorld } from "./world";

export function populateWorld(history: History): void {
  history.dialects.set({
    language: generateLanguage(history),
  });
  createWorldRegion(history.regions);
  createInitialDeities(history);
  if (history.regions.map.size >= 1 && !history.world) {
    history.world = createWorld(history, config.worldWidth, config.worldHeight);
  }
}

export function createDeity(beings: Lookup<Being>, theme: string): Being {
  return beings.set({
    kind: "deity",
    name: createDeityName(),
    theme,
    relationships: {},
    needs: createNeeds(),
  });
}

export function getDeities(beings: Lookup<Being>): Being[] {
  return lookupValues(beings).filter((being) => being.kind === "deity");
}

export function createWorldRegion(regions: Lookup<Region>): Region {
  return regions.set({
    name: createWorldName(),
    discovered: true,
  });
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

// const regionVibes = [
//   "sorrow",
//   "elation",
//   "tranquility",
//   "peace",
//   "strife",
//   "anger",
//   "fear",
//   "calm",
// ];

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

export function createRegionName(): string {
  const mode = randomInt(0, 3);
  switch (mode) {
    case 0:
      return `the ${describeNoun(regionPlaces, regionAdjectives)}`;
    case 1:
      return `the ${describeNoun(regionPlaces, regionAdjectives)}`;
    // return `the ${describeNoun(
    //   regionPlaces,
    //   regionAdjectives
    // )} of ${randomChoice(regionVibes)}`;
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
