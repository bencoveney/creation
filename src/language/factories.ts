import { config } from "../config";
import { flipCoin, randomChoice, randomInt } from "../utils/random";

export function describeNoun(nouns: string[], adjectices: string[]) {
  return flipCoin()
    ? randomChoice(nouns)
    : `${randomChoice(adjectices)} ${randomChoice(nouns)}`;
}

let worldNameCount = 0;
export function createWorldName(): string {
  return `world_${worldNameCount++}`;
}

export function createRegionName(): string {
  const mode = randomInt(0, 3);
  switch (mode) {
    case 0:
      return `the ${describeNoun(
        config.regionPlaces,
        config.regionAdjectives
      )}`;
    case 1:
      return `the ${describeNoun(
        config.regionPlaces,
        config.regionAdjectives
      )}`;
    // return `the ${describeNoun(
    //   regionPlaces,
    //   regionAdjectives
    // )} of ${randomChoice(regionVibes)}`;
    case 2:
      // Syllables
      return `${randomChoice(config.settlementNameStarts)}${randomChoice(
        config.settlementNameEnds
      )}`;
    default:
      return "default";
  }
}

let deityNameCount = 0;
export function createDeityName(): string {
  return `deity_${deityNameCount++}`;
}
