import { config } from "../../config";
import { Phonotactics } from "../ipa/phonotactics";
import { Morpheme, createRootMorpheme } from "./morpheme";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export function createRoots(phonotactics: Phonotactics): Morpheme[] {
  return rootConcepts.map((concept) =>
    createRootMorpheme(concept, phonotactics)
  );
}

export const affixConcepts = ["deity", "place"];

export function createAffixes(phonotactics: Phonotactics): Morpheme[] {
  return rootConcepts.map((concept) =>
    createRootMorpheme(concept, phonotactics)
  );
}
