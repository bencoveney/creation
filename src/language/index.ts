import { nextId } from "../utils/id";
import { englishPhonotactics } from "./ipa/fromEnglish";
import { Phonotactics } from "./ipa/phonotactics";
import { Word, spellWord } from "./lexicon/word";
import {
  WordRegistry,
  createRegistryKey,
  createWordRegistry,
  getWordForKey,
} from "./lexicon/wordRegistry";
import { HasNames } from "./names";

export type Language = HasNames & {
  id: string;
  registry: WordRegistry;
  phonotactics: Phonotactics;
};

export function createLanguage(): Language {
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

export function getNameWord(hasNames: HasNames, language: Language): Word {
  let existingName = hasNames.names[language.id];
  if (!existingName) {
    hasNames.names[language.id] = hasNames.names.defaultKey;
    existingName = hasNames.names.defaultKey;
  }
  return getWordForKey(language.registry, language.phonotactics, existingName);
}

export function spellNameWord(hasNames: HasNames, language: Language): string {
  return spellWord(getNameWord(hasNames, language));
}

export function spellNameWordByKey(key: string, language: Language): string {
  return spellWord(
    getWordForKey(language.registry, language.phonotactics, key)
  );
}
