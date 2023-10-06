import { config } from "../../config";
import { Phonotactics } from "../ipa/phonotactics";
import { Morpheme, createAffixMorpheme, createRootMorpheme } from "./morpheme";
import { Word, addAffix, createRootWord } from "./word";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export function createRootMorphemes(phonotactics: Phonotactics): Morpheme[] {
  return rootConcepts.map((concept) =>
    createRootMorpheme(concept, phonotactics)
  );
}

export const affixConcepts = ["deity", "place"];

export function createAffixMorphemes(phonotactics: Phonotactics): Morpheme[] {
  return affixConcepts.map((concept) =>
    createAffixMorpheme(concept, phonotactics)
  );
}

export function createRootWords(morphemes: Morpheme[]): Word[] {
  return morphemes.map((morpheme) => createRootWord(morpheme));
}

export function addAffixes(word: Word, affixMorphemes: Morpheme[]): Word[] {
  return affixMorphemes.map((affixMorpheme) => addAffix(word, affixMorpheme));
}
