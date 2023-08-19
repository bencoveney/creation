import { Being, Region, World } from ".";
import { Lookup } from "../utils/lookup";
import { flipCoin, randomChoice, randomInt } from "../utils/random";
import { generateLanguage } from "./language";

export function populateWorld(world: World): void {
  console.log("populating");
  world.dialects.set({
    language: generateLanguage(),
  });
  for (let i = 0; i < 3; i++) {
    createDeity(world.beings);
  }
  for (let i = 0; i < 20; i++) {
    createBeing(world.beings);
  }
  for (let i = 0; i < 20; i++) {
    createRegion(world.regions);
  }
}

function createBeing(beings: Lookup<Being>): void {
  beings.set({
    name: createBeingName(),
  });
}

function createDeity(beings: Lookup<Being>): void {
  beings.set({
    name: createDeityName(),
  });
}

function createRegion(regions: Lookup<Region>): void {
  regions.set({
    name: createRegionName(),
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

// https://en.wikipedia.org/wiki/List_of_fictional_deities
const deityNames = [
  "Alash",
  "Tash",
  "Azathoth",
  "Cthulhu",
  "Nyarlathotep",
  "Eru",
  "Melkor",
  "Ares",
  "Darkseid",
  "Rao",
  "Beerus",
  "Odin",
];

function createDeityName(): string {
  return randomChoice(deityNames);
}
