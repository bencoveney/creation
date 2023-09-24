import { Language } from ".";
import { Phoneme } from "./phoneme";
import { spellWord } from "./spelling";
import { generateSyllable } from "./syllable";

export type VoicedWord = Phoneme[];

function generateUnusedWord(language: Language, minSyllables: number) {
  let attempt = 1;
  while (true) {
    const numSyllables = minSyllables + Math.floor(attempt++ / 5);
    const possible: VoicedWord = [];
    for (let i = 0; i < numSyllables; i++) {
      const syllable = generateSyllable(language);
      possible.push(...syllable);
    }
    const conflictingPhonemes = Object.entries(language.words).find(
      ([_, voiced]) =>
        possible.length === voiced.length &&
        possible.every((phoneme, index) => voiced[index] === phoneme)
    );
    if (conflictingPhonemes) {
      console.log(
        `Phonemes conflict with ${conflictingPhonemes[0]} (${conflictingPhonemes[1]})`
      );
    } else {
      const conflictingSpelling = Object.entries(language.words).find(
        ([_, voiced]) => spellWord(voiced) === spellWord(possible)
      );
      if (conflictingSpelling) {
        console.log(
          `Spelling conflict with ${conflictingSpelling[0]} (${conflictingSpelling[1]})`
        );
      } else {
        return possible;
      }
    }
    if (attempt > 50) {
      console.error("Couldn't generate word :<");
      return [];
    }
  }
}

export function getWord(word: string, language: Language, minSyllables = 2) {
  const sanitised = word.toLocaleLowerCase();

  if (!language.words[sanitised]) {
    language.words[sanitised] = generateUnusedWord(language, minSyllables);
  }

  return language.words[sanitised];
}

export function getWords(words: string, language: Language): VoicedWord[] {
  return words.split(" ").map((word) => getWord(word, language));
}
