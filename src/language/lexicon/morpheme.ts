import { randomChoice } from "../../utils/random";
import { Phonotactics } from "../ipa/phonotactics";
import { Syllable, createSyllable } from "../ipa/syllable";

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

export function createRootMorpheme(
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  return createMorpheme(concept, MorphemeKind.Root, phonotactics, 3);
}

export function createAffixMorpheme(
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  const affixType = randomChoice([MorphemeKind.Prefix, MorphemeKind.Suffix]);
  return createMorpheme(concept, affixType, phonotactics, 2);
}

export function createMorpheme(
  concept: string,
  kind: MorphemeKind,
  phonotactics: Phonotactics,
  maxSize: number
): Morpheme {
  return {
    concept,
    kind,
    syllable: createSyllable(phonotactics, maxSize),
  };
}
