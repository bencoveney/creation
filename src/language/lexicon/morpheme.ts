import { Phonotactics } from "../ipa/phonotactics";
import { Syllable, createSyllable, spellSyllable } from "../ipa/syllable";

export enum MorphemeKind {
  Root,
  // https://en.wikipedia.org/wiki/Affix#Adfixes,_infixes_and_their_variations
  Prefix,
  Suffix,
}

export type Morpheme = {
  concept: string;
  kind: MorphemeKind;
  syllable: Syllable;
};

export function createMorpheme(
  concept: string,
  kind: MorphemeKind,
  phonotactics: Phonotactics,
  minSize: number,
  maxSize: number
): Morpheme {
  return {
    concept,
    kind,
    syllable: createSyllable(phonotactics, minSize, maxSize),
  };
}

export function spellMorpheme(morpheme: Morpheme): string {
  return spellSyllable(morpheme.syllable);
}
