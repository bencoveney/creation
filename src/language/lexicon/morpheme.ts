import { randomChoice } from "../../utils/random";
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

export function createRootMorpheme(
  usedMorphemes: UsedMorphemes,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  return createUnusedMorpheme(
    usedMorphemes,
    concept,
    MorphemeKind.Root,
    phonotactics,
    3
  );
}

export function createAffixMorpheme(
  usedMorphemes: UsedMorphemes,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  const affixType = randomChoice([MorphemeKind.Prefix, MorphemeKind.Suffix]);
  return createUnusedMorpheme(
    usedMorphemes,
    concept,
    affixType,
    phonotactics,
    2
  );
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

export type UsedMorphemes = Map<string, Morpheme>;

export function hasMorphemeBeenUsed(used: UsedMorphemes, morpheme: Morpheme) {
  const key = spellMorpheme(morpheme);
  return used.has(key);
}

export function registerMorpheme(used: UsedMorphemes, morpheme: Morpheme) {
  const key = spellMorpheme(morpheme);
  if (used.has(key)) {
    throw new Error(`${key} already registered`);
  } else {
    used.set(key, morpheme);
  }
}

export function createUnusedMorpheme(
  used: UsedMorphemes,
  concept: string,
  kind: MorphemeKind,
  phonotactics: Phonotactics,
  maxSize: number
) {
  while (true) {
    const morpheme = createMorpheme(concept, kind, phonotactics, maxSize);
    const key = spellMorpheme(morpheme);
    if (!used.has(key)) {
      used.set(key, morpheme);
      return morpheme;
    }
  }
}

export function spellMorpheme(morpheme: Morpheme): string {
  return spellSyllable(morpheme.syllable);
}
