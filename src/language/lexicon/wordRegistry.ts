import { sortStrings } from "../../utils/string";
import { Phonotactics } from "../ipa/phonotactics";
import {
  MorphemeRegistry,
  createMorphemeRegistry,
  getAffixMorpheme,
  getRootMorpheme,
} from "./morphemeRegistry";
import { Word, addAffix, createRootWord } from "./word";

export type WordRegistry = {
  knownWords: Set<String>;
  conceptLookup: Map<string, Word>;
  morphemes: MorphemeRegistry;
};

export function createWordRegistry(): WordRegistry {
  return {
    knownWords: new Set(),
    conceptLookup: new Map(),
    morphemes: createMorphemeRegistry(),
  };
}

export function createRegistryKey(
  rootConcept: string,
  affixConcepts: string[]
) {
  if (!rootConcept) {
    throw new Error("What");
  }
  if (affixConcepts.length === 0) {
    return rootConcept.toLowerCase();
  }
  return `${rootConcept}${sortStrings(affixConcepts)
    .map((affixConcept) => `_${affixConcept}`)
    .join("")}`.toLowerCase();
}

export function getWord(
  registry: WordRegistry,
  phonotactics: Phonotactics,
  rootConcept: string,
  affixConcepts: string[]
): Word {
  const key = createRegistryKey(rootConcept, affixConcepts);
  if (registry.conceptLookup.has(key)) {
    return registry.conceptLookup.get(key)!;
  }
  const rootMorpheme = getRootMorpheme(
    registry.morphemes,
    rootConcept,
    phonotactics
  );
  const rootWord = createRootWord(rootMorpheme);
  const affixMorphemes = affixConcepts.map((affixConcept) =>
    getAffixMorpheme(registry.morphemes, affixConcept, phonotactics)
  );
  const affixed = affixMorphemes.reduce<Word>(
    (prev, next) => addAffix(prev, next),
    rootWord
  );
  registry.knownWords.add(key);
  registry.conceptLookup.set(key, affixed);
  return affixed;
}

export function getWordForKey(
  registry: WordRegistry,
  phonotactics: Phonotactics,
  key: string
) {
  if (registry.conceptLookup.has(key)) {
    return registry.conceptLookup.get(key)!;
  }
  const [root, ...affixes] = key.split("_");
  return getWord(registry, phonotactics, root, affixes);
}
