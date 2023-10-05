import { config } from "../../config";
import { Phonotactics } from "../ipa/phonotactics";
import { Morpheme, MorphemeKind, createMorpheme } from "./morpheme";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export function createRootWords(phonotactics: Phonotactics): Morpheme[] {
  return rootConcepts.map((concept) =>
    createMorpheme(concept, MorphemeKind.Root, phonotactics)
  );
}
