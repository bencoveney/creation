import { consonants } from "./consonant";
import { vowels } from "./vowels";
import {
  englishCoda,
  englishConsonants,
  englishDiphthongs,
  englishNucleus,
  englishOnset,
  englishSyllableStructure,
  englishVowels,
} from "./fromEnglish";
import {
  getPossibleSyllableStructures,
  stringifySyllableStructure,
} from "./phonotactics";
import { findValues } from "./utils";

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
}
