import { randomChoice } from "../../utils/random";
import { Phonotactics } from "../ipa/phonotactics";
import {
  Morpheme,
  spellMorpheme,
  MorphemeKind,
  createMorpheme,
} from "./morpheme";

export function createRootMorpheme(
  registry: MorphemeRegistry,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  return createUnusedMorpheme(
    registry,
    concept,
    MorphemeKind.Root,
    phonotactics,
    2,
    4
  );
}

export function createAffixMorpheme(
  registry: MorphemeRegistry,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  const affixType = randomChoice([MorphemeKind.Prefix, MorphemeKind.Suffix]);
  return createUnusedMorpheme(registry, concept, affixType, phonotactics, 1, 3);
}

export type MorphemeRegistry = {
  used: Set<string>;
  conceptLookup: Map<string, Morpheme>;
};

export function createMorphemeRegistry(): MorphemeRegistry {
  return {
    used: new Set(),
    conceptLookup: new Map(),
  };
}

export function hasMorphemeBeenUsed(
  registry: MorphemeRegistry,
  morpheme: Morpheme
) {
  const key = spellMorpheme(morpheme);
  return registry.used.has(key);
}

export function registerMorpheme(
  registry: MorphemeRegistry,
  morpheme: Morpheme
) {
  const spelling = spellMorpheme(morpheme);
  if (registry.used.has(spelling)) {
    throw new Error(`${spelling} already registered`);
  } else {
    registry.used.add(spelling);
    registry.conceptLookup.set(morpheme.concept, morpheme);
  }
}

export function createUnusedMorpheme(
  registry: MorphemeRegistry,
  concept: string,
  kind: MorphemeKind,
  phonotactics: Phonotactics,
  minSize: number,
  maxSize: number
) {
  while (true) {
    const morpheme = createMorpheme(
      concept,
      kind,
      phonotactics,
      minSize,
      maxSize
    );
    const spelling = spellMorpheme(morpheme);
    if (!registry.used.has(spelling)) {
      registry.used.add(spelling);
      registry.conceptLookup.set(morpheme.concept, morpheme);
      return morpheme;
    }
  }
}
