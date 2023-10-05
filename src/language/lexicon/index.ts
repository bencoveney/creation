import { config } from "../../config";
import { SyllableStructure } from "../ipa/phonotactics";
import { Morpheme, MorphemeKind, createMorpheme } from "./morpheme";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export function createRootWords(
  possibleOnset: string[],
  possibleNucleus: string[],
  possibleCoda: string[],
  syllableStructures: SyllableStructure[]
): Morpheme[] {
  return rootConcepts.map((concept) =>
    createMorpheme(
      concept,
      MorphemeKind.Root,
      possibleOnset,
      possibleNucleus,
      possibleCoda,
      syllableStructures
    )
  );
}
