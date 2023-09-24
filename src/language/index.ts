import { config } from "../config";
import { flipCoin } from "../utils/random";
import { VoicedWord, getWord } from "./word";
import { Phonemes, allPhonemes } from "./phoneme";
import { SyllableStructure, generateSyllableStructure } from "./syllable";
import { History } from "../history";

export type Language = {
  name: string;
  phonemes: Phonemes;
  syllableStructure: SyllableStructure;
  words: {
    [key: string]: VoicedWord;
  };
};

export function generateLanguage(history: History): Language {
  const phonemes: Phonemes = {
    singleVowels: allPhonemes.singleVowels.filter(() => flipCoin()),
    dipthongs: allPhonemes.dipthongs.filter(() => flipCoin()),
    unvoicedConstants: allPhonemes.unvoicedConstants.filter(() => flipCoin()),
    voicedConstants: allPhonemes.voicedConstants.filter(() => flipCoin()),
  };
  const syllableStructure = generateSyllableStructure();
  const language: Language = {
    name: "language",
    phonemes,
    syllableStructure,
    words: {},
  };

  // Preload a few words:
  config.preRegisterWords.map((word) => getWord(word, language, 1));
  getWord(language.name, language, 2);

  return language as Language;
}
