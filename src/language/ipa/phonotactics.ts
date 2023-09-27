import { Consonant } from "./consonant";
import { Vowel } from "./vowels";

export enum PhonemeKind {
  Consonant,
  Vowel,
}

export type Syllable = {
  onset: Consonant[];
  rhyme: {
    nucleus: Vowel[];
    Coda: Consonant[];
  };
};

export type SyllableStructure = {
  onset: number;
  rhyme: {
    nucleus: number;
    coda: number;
  };
};

export function describeSyllableStructure(
  syllableStructure: SyllableStructure
) {
  return [
    ...new Array(syllableStructure.onset).fill(PhonemeKind.Consonant),
    ...new Array(syllableStructure.rhyme.nucleus).fill(PhonemeKind.Vowel),
    ...new Array(syllableStructure.rhyme.coda).fill(PhonemeKind.Consonant),
  ];
}

export function stringifySyllableStructure(
  syllableStructure: SyllableStructure
) {
  return describeSyllableStructure(syllableStructure)
    .map((part) => (part === PhonemeKind.Consonant ? "C" : "V"))
    .join("");
}
