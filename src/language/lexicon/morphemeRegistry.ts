import { randomChoice } from "../../utils/random";
import { Phonotactics } from "../ipa/phonotactics";
import {
  Morpheme,
  spellMorpheme,
  MorphemeKind,
  createMorpheme,
} from "./morpheme";

export function getRootMorpheme(
  registry: MorphemeRegistry,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  if (registry.conceptLookup.has(concept)) {
    return registry.conceptLookup.get(concept)!;
  }
  return createUnusedMorpheme(
    registry,
    concept,
    MorphemeKind.Root,
    phonotactics,
    2,
    4
  );
}

export function getAffixMorpheme(
  registry: MorphemeRegistry,
  concept: string,
  phonotactics: Phonotactics
): Morpheme {
  if (registry.conceptLookup.has(concept)) {
    return registry.conceptLookup.get(concept)!;
  }
  const affixType = randomChoice([MorphemeKind.Prefix, MorphemeKind.Suffix]);
  return createUnusedMorpheme(registry, concept, affixType, phonotactics, 2, 3);
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
