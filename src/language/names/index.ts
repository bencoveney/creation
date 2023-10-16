// How a thing is known, in different languages.

import { nextId } from "../../utils/id";
import { englishPhonotactics } from "../ipa/fromEnglish";
import { Phonotactics } from "../ipa/phonotactics";
import { Word, spellWord } from "../lexicon/word";
import {
  WordRegistry,
  createRegistryKey,
  createWordRegistry,
  getWordForKey,
} from "../lexicon/wordRegistry";

// Map from a language to the concept, to be used in the word conceptLookup.
export type Names = {
  defaultKey: string;
  [languageId: string]: string;
};

export type HasNames = {
  names: Names;
};

// Call it "NewLanguage" and leave it here... until the old stuff is removed.
export type NewLanguage = HasNames & {
  id: string;
  registry: WordRegistry;
  phonotactics: Phonotactics;
};

export function createNewLanguage(): NewLanguage {
  return {
    id: nextId(),
    registry: createWordRegistry(),
    phonotactics: englishPhonotactics,
    names: createNames("speech"),
  };
}

export function createNames(root: string, affixes: string[] = []) {
  return {
    defaultKey: createRegistryKey(root, affixes),
  };
}

export function getNameWord(hasNames: HasNames, language: NewLanguage): Word {
  let existingName = hasNames.names[language.id];
  if (!existingName) {
    hasNames.names[language.id] = hasNames.names.defaultKey;
    existingName = hasNames.names.defaultKey;
  }
  return getWordForKey(language.registry, language.phonotactics, existingName);
}

export function spellNameWord(
  hasNames: HasNames,
  language: NewLanguage
): string {
  return spellWord(getNameWord(hasNames, language));
}
