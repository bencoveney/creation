import { nextId } from "../utils/id";
import { englishPhonotactics } from "./samples/englishPhonotactics";
import { Phonotactics } from "./phonology/phonotactics";
import { Word, spellWord } from "./morphology/word";
import {
  WordRegistry,
  createWordRegistry,
  getWordForKey,
} from "./morphology/wordRegistry";
import { HasNames, createNames } from "./names";
import { stringifySyllableStructure } from "./phonology/syllableStructure";

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

function getNameWord(hasNames: HasNames, language: Language): Word {
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

export function validateLanguage(hasNames: HasNames[], language: Language) {
  console.log("onset", language.phonotactics.possibilities.onset);
  console.log("nucleus", language.phonotactics.possibilities.nucleus);
  console.log("coda", language.phonotactics.possibilities.coda);
  console.log(
    "syllableStructure",
    stringifySyllableStructure(language.phonotactics.syllableStructure)
  );
  console.log(
    "possibleSyllables",
    language.phonotactics.possibleSyllableStructures.map((syllableStructure) =>
      stringifySyllableStructure(syllableStructure)
    )
  );
  console.log(
    hasNames.map((hasNames) => {
      return `${hasNames.names.defaultKey} => ${spellNameWord(
        hasNames,
        language
      )}`;
    })
  );
  console.log([...language.registry.knownWords.values()]);
}
export { createNames };
