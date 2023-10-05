import { Phonotactics } from "../ipa/phonotactics";
import { Syllable, createSyllable } from "../ipa/syllable";

export enum MorphemeKind {
  Root,
  Affix,
}

export type Morpheme = {
  concept: string;
  kind: MorphemeKind;
  syllable: Syllable;
};

export function createMorpheme(
  concept: string,
  kind: MorphemeKind,
  phonotactics: Phonotactics
): Morpheme {
  return {
    concept,
    kind,
    syllable: createSyllable(phonotactics, 3),
  };
}
