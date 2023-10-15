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

/*
  At the moment this maps spelling => morpheme.
  We never actually map from spelling to morpheme, we only check if a particular morpheme
  has been used. A better set up would probably be:
  Set<spellings> & Map<Concept, Morpheme(or spelling?)>
  That would let us check for uniqueness, but also look up by concept to see if we already
  have a morpheme.
*/
export type MorphemeRegistry = Map<string, Morpheme>;

export function hasMorphemeBeenUsed(
  registry: MorphemeRegistry,
  morpheme: Morpheme
) {
  const key = spellMorpheme(morpheme);
  return registry.has(key);
}

export function registerMorpheme(
  registry: MorphemeRegistry,
  morpheme: Morpheme
) {
  const key = spellMorpheme(morpheme);
  if (registry.has(key)) {
    throw new Error(`${key} already registered`);
  } else {
    registry.set(key, morpheme);
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
    const key = spellMorpheme(morpheme);
    if (!registry.has(key)) {
      registry.set(key, morpheme);
      return morpheme;
    }
  }
}
