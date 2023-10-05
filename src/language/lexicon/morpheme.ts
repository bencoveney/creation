import { SyllableStructure } from "../ipa/phonotactics";
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
  possibleOnset: string[],
  possibleNucleus: string[],
  possibleCoda: string[],
  syllableStructures: SyllableStructure[]
): Morpheme {
  return {
    concept,
    kind,
    syllable: createSyllable(
      syllableStructures,
      possibleOnset,
      possibleNucleus,
      possibleCoda,
      3
    ),
  };
}
