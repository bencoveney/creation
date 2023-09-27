/*
  https://en.wikipedia.org/wiki/International_Phonetic_Alphabet_chart_for_English_dialects
  https://en.wikipedia.org/wiki/English_phonology
  https://en.wikipedia.org/wiki/English_language_in_England
*/

import { SyllableStructure } from "./phonotactics";

export const englishConsonants = [
  "m",
  "n",
  "ŋ",
  "p",
  "t",
  "tʃ",
  "k",
  "b",
  "d",
  "dʒ",
  "ɡ",
  "f",
  "θ",
  "s",
  "ʃ",
  "x",
  "h",
  "v",
  "ð",
  "z",
  "ʒ",
  "l",
  "r",
  "j",
  "w",
];

export const englishVowels = [
  "ɪ",
  "iː",
  "ʊ",
  "uː",
  "ɔː",
  "e",
  "ɛː",
  "ə",
  "ɜː",
  "ɒ",
  "æ",
  "ʌ",
  "ɑː",
];

export const englishDiphthongs = ["eɪ", "aɪ", "ɔɪ", "aʊ", "əʊ", "ɪə", "ʊə"];

export const englishSyllableStructure = {
  onset: 3,
  rhyme: {
    nucleus: 1,
    coda: 5,
  },
} as SyllableStructure;
