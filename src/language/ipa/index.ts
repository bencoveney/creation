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
import {
  addAffixes,
  createAffixMorphemes,
  createRootMorphemes,
  createRootWords,
} from "../lexicon";
import { spellSyllable } from "./syllable";
import {
  stringifySyllableStructure,
  getPossibleSyllableStructures,
} from "./syllableStructure";
import { describeWord, spellWord } from "../lexicon/word";

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
  const rootMorphemes = createRootMorphemes(englishPhonotactics);
  console.log(
    "rootMorphemes",
    rootMorphemes.map(
      (rootMorpheme) =>
        `${rootMorpheme.concept} => /${spellSyllable(rootMorpheme.syllable)}/`
    )
  );
  const affixMorphemes = createAffixMorphemes(englishPhonotactics);
  console.log(
    "affixMorphemes",
    affixMorphemes.map(
      (affixMorpheme) =>
        `${affixMorpheme.concept} => /${spellSyllable(affixMorpheme.syllable)}/`
    )
  );
  const rootWords = createRootWords(rootMorphemes);
  console.log(
    "rootWords",
    rootWords.map(
      (rootWord) => `${describeWord(rootWord)} => /${spellWord(rootWord)}/`
    )
  );
  const affixWords = rootWords
    .map((rootWord) => addAffixes(rootWord, affixMorphemes))
    .flat(1);
  console.log(
    "affixWords",
    affixWords.map(
      (affixWord) => `${describeWord(affixWord)} => /${spellWord(affixWord)}/`
    )
  );
}
