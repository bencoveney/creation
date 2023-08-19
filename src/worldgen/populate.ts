import { Artifact, Being, Region, World } from ".";
import { Lookup } from "../utils/lookup";
import {
  flipCoin,
  randomChoice,
  randomInt,
  randomSelection,
} from "../utils/random";
import { generateLanguage } from "./language";

export function populateWorld(world: World): void {
  world.dialects.set({
    language: generateLanguage(),
  });
}

export function createBeing(beings: Lookup<Being>): Being {
  return beings.set({
    name: createBeingName(),
    power: 0,
  });
}

export function createDeity(beings: Lookup<Being>): Being {
  return beings.set({
    name: createDeityName(),
    power: 1,
  });
}

export function getDeities(beings: Lookup<Being>): Being[] {
  return [...beings.map.values()].filter((being) => being.power === 1);
}

const artifactSelection = randomSelection([
  "sword",
  "shield",
  "dagger",
  "spear",
  "cup",
  "bowl",
  "knife",
  "bracelet",
  "necklace",
  "chain",
  "rope",
  "gown",
  "robe",
  "club",
  "scepter",
  "vial",
  "hood",
  "veil",
  "necklace",
  "eyeglass",
  "map",
]);

export function createArtifact(
  creators: Being[],
  artifacts: Lookup<Artifact>
): Artifact {
  return artifacts.set({
    name: createArtifactName(),
    object: artifactSelection(),
  });
}

const motifs = randomSelection([
  "Cross",
  "Triangle",
  "Circle",
  "Square",
  "Star",
  "Ring", // Donut/Torus
  "Arrowhead",
  "Diamond", // Rhombus
  "Cresent",
  "Semicircle",
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

const regionPlaces = [
  "Woods",
  "Halls",
  "Cliffs",
  "Forest",
  "Plains",
  "Tundras",
  "Mountains",
  "Streets",
];

const regionVibes = [
  "Sorrow",
  "Elation",
  "Tranquility",
  "Peace",
  "Strife",
  "Anger",
  "Fear",
  "Calm",
];

const regionAdjectives = [
  "Windy",
  "Calm",
  "Frozen",
  "Windswept",
  "Sunny",
  "Tranquil",
  "Undead",
  "Barren",
];

const settlementNameStarts = [
  "Ply",
  "Exe",
  "Tor",
  "Paign",
  "Ex",
  "Barn",
  "Ton",
  "Tiver",
  "Brix",
  "Bide",
  "Teign",
  "Sid",
  "Dawl",
  "Tavi",
  "North",
  "Ivy",
];

const settlementNameEnds = [
  "mouth",
  "ter",
  "quay",
  "ton",
  "staple",
  "ton Abbot",
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
  console.log("regionMode", mode);
  switch (mode) {
    case 0:
      return `The ${describeNoun(regionPlaces, regionAdjectives)}`;
    case 1:
      return `The ${describeNoun(
        regionPlaces,
        regionAdjectives
      )} Of ${randomChoice(regionVibes)}`;
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
  "Alex",
  "Brook",
  "Charlie",
  "Frankie",
  "Gabriel",
  "Jesse",
  "Sam",
  "Taylor",
];

// https://en.wikipedia.org/wiki/List_of_most_common_surnames_in_Europe#United_Kingdom
const secondNames = [
  "Smith",
  "Jones",
  "Taylor",
  "Brown",
  "Williams",
  "Wilson",
  "Johnson",
  "Davies",
  "Robinson",
  "Wright",
  "Thompson",
  "Evans",
  "Walker",
  "White",
  "Roberts",
  "Green",
  "Hall",
  "Wood",
  "Jackson",
  "Clark",
];
const professionNames = [
  "Butcher",
  "Farmer",
  "Explorer",
  "Shopkeeper",
  "Innkeeper",
  "Cook",
  "Shepherd",
  "Guard",
  "Tailor",
  "Hunter",
  "Bard",
];
const rankNames = [
  "King",
  "Queen",
  "Prince",
  "Princess",
  "Lord",
  "Lady",
  "Baron",
  "Baroness",
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

let artifactNameCount = 0;
function createArtifactName(): string {
  return `artifact_${deityNameCount++}`;
}
