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
import { createRootWords } from "../lexicon";
import { spellSyllable } from "./syllable";
import {
  stringifySyllableStructure,
  getPossibleSyllableStructures,
} from "./syllableStructure";

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
  console.log(
    createRootWords(englishPhonotactics).map(
      (root) => `${root.concept} => ${spellSyllable(root.syllable)}`
    )
  );
}
