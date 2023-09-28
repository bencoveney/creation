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

export const englishOnsets = [
  // Stop plus approximant other than /j/:
  "pl",
  "bl",
  "kl",
  "ɡl",
  "pr",
  "br",
  "tr",
  "dr",
  "kr",
  "ɡr",
  "tw",
  "dw",
  "ɡw",
  "kw",
  "pw",
  // Voiceless fricative or /v/ plus approximant other than /j/:[b]
  "fl",
  "sl",
  "θl",
  "ʃl",
  "fr",
  "θr",
  "ʃr",
  "hw",
  "sw",
  "θw",
  "vw",
  // Consonant other than /r/ or /w/ plus /j/ (before /uː/ or its modified/reduced forms):[e]
  "pj",
  "bj",
  "tj",
  "dj",
  "kj",
  "ɡj",
  "mj",
  "nj",
  "fj",
  "vj",
  "θj",
  "sj",
  "zj",
  "hj",
  "lj",
  // /s/ plus voiceless stop:[f]
  "sp",
  "st",
  "sk",
  // /s/ plus nasal other than /ŋ/:[f]
  "sm",
  "sn",
  // /s/ plus voiceless non-sibilant fricative:[c]
  "sf",
  "sθ",
  // /s/ plus voiceless stop plus approximant:[f]
  "spl",
  "skl",
  "spr",
  "str",
  "skr",
  "skw",
  "spj",
  "stj",
  "skj",
  // /s/ plus nasal plus approximant:
  "smj",
  // /s/ plus voiceless non-sibilant fricative plus approximant:[c]
  "sfr",
];

export const englishSyllableStructure = {
  onset: 3,
  rhyme: {
    nucleus: 1,
    coda: 5,
  },
} as SyllableStructure;
