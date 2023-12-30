import { consonants } from "./consonant";
import { vowels } from "./vowels";

export enum PhonemeKind {
  Consonant,
  Vowel,
}

export type Phoneme = {
  ipaCharacter: string;
  name: string;
  // ipaNumber: number;
  // ipaUnicode: string;
};

export type PhonemeLookup = { [char: string]: Phoneme };
export function createPhonemeLookup(values: Phoneme[]): PhonemeLookup {
  const result: PhonemeLookup = {};
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    result[value.ipaCharacter] = value;
  }
  return result;
}

export const phonemeLookup = {
  ...createPhonemeLookup(vowels),
  ...createPhonemeLookup(consonants),
};
