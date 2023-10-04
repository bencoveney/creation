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
  Syllable,
  getPossibleSyllableStructures,
  stringifySyllableStructure,
} from "./phonotactics";
import { HasIpaCharacter, findValues } from "./utils";
import { createRootWords } from "../lexicon";

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
    createRootWords(
      englishOnset,
      englishNucleus,
      englishCoda,
      getPossibleSyllableStructures(englishSyllableStructure)
    ).map((root) => `${root.concept} => ${spell(root.syllables)}`)
  );
}

export function spell(syllables: Syllable[]) {
  const chars = syllables
    .map<HasIpaCharacter[][]>((syllable) => [
      syllable.onset,
      syllable.rhyme.nucleus,
      syllable.rhyme.coda,
    ])
    .flat(2);
  return `/${chars.map((char) => char.ipaCharacter).join("")}/`;
}
