import { consonants } from "./consonant";
import { vowels } from "./vowels";
import {
  englishCoda,
  englishConsonants,
  englishDiphthongs,
  englishNucleus,
  englishOnset,
  englishPhonotactics,
  englishSyllableStructure,
  englishVowels,
} from "./fromEnglish";
import { findValues } from "./utils";
import { affixConcepts, rootConcepts } from "../lexicon/concepts";
import {
  stringifySyllableStructure,
  getPossibleSyllableStructures,
} from "./syllableStructure";
import { Word, spellWord } from "../lexicon/word";
import { createWordRegistry, getWord } from "../lexicon/wordRegistry";

export function validate() {
  console.log("consonants", findValues(consonants, englishConsonants));
  console.log("vowels", findValues(vowels, englishVowels));
  console.log("diphthongs", findValues(vowels, englishDiphthongs));
  console.log("onset", findValues(consonants, englishOnset));
  console.log("nucleus", findValues(vowels, englishNucleus));
  console.log("coda", findValues(consonants, englishCoda));
  console.log(
    "syllableStructure",
    stringifySyllableStructure(englishSyllableStructure)
  );
  console.log(
    "possibleSyllables",
    getPossibleSyllableStructures(englishSyllableStructure).map(
      (syllableStructure) => stringifySyllableStructure(syllableStructure)
    )
  );
  const wordRegistry = createWordRegistry();
  const words: Word[] = [];
  rootConcepts.forEach((rootConcept) => {
    const word = getWord(wordRegistry, englishPhonotactics, rootConcept, []);
    words.push(word);
  });
  affixConcepts.forEach((affixConcept) => {
    rootConcepts.forEach((rootConcept) => {
      const word = getWord(wordRegistry, englishPhonotactics, rootConcept, [
        affixConcept,
      ]);
      words.push(word);
    });
  });
  rootConcepts.forEach((rootConcept) => {
    const word = getWord(
      wordRegistry,
      englishPhonotactics,
      rootConcept,
      affixConcepts
    );
    words.push(word);
  });
  console.log(
    "words",
    [...wordRegistry.conceptLookup.entries()]
      .filter(([concept]) => /(earth)|(air)|(water)|(fire)/.test(concept))
      .map(([concept, word]) => `${concept} => ${spellWord(word)}`)
  );
}
