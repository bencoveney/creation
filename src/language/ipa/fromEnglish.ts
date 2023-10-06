/*
  https://en.wikipedia.org/wiki/International_Phonetic_Alphabet_chart_for_English_dialects
  https://en.wikipedia.org/wiki/English_phonology
  https://en.wikipedia.org/wiki/English_language_in_England
*/

import { Phonotactics } from "./phonotactics";
import {
  SyllableStructure,
  getPossibleSyllableStructures,
} from "./syllableStructure";

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

export const englishOnset = [
  // All single-consonant phonemes except /ŋ/
  ...englishConsonants,
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

export const englishNucleus = [...englishVowels, ...englishDiphthongs];

export const englishCoda = [
  // The single consonant phonemes except /h/, /w/, /j/ and, in non-rhotic varieties, /r/
  ...englishConsonants,
  // Lateral approximant plus stop or affricate:
  "lp",
  "lb",
  "lt",
  "ld",
  "ltʃ",
  "ldʒ",
  "lk",
  // In rhotic varieties, /r/ plus stop or affricate:
  "rp",
  "rb",
  "rt",
  "rd",
  "rtʃ",
  "rdʒ",
  "rk",
  "rɡ",
  // Lateral approximant + fricative:
  "lf",
  "lv",
  "lθ",
  "ls",
  "lz",
  "lʃ",
  "lð",
  // In rhotic varieties, /r/ + fricative:
  "rf",
  "rv",
  "rθ",
  "rð",
  "rs",
  "rz",
  "rʃ",
  // Lateral approximant + nasal:
  "lm",
  "ln",
  // In rhotic varieties, "r" + nasal or lateral:
  "rm",
  "rn",
  "rl",
  // Nasal + homorganic stop or affricate:
  "mp",
  "nt",
  "nd",
  "ntʃ",
  "ndʒ",
  "ŋk",
  // Nasal + fricativ
  "mf",
  "mz",
  "mθ",
  "nf",
  "nθ",
  "ns",
  "nz",
  "ŋθ",
  "ŋð",
  // Voiceless fricative plus voiceless stop:
  "ft",
  "sp",
  "st",
  "sk",
  "ʃt",
  "θt",
  // Voiced fricative plus voiced stop
  "zd",
  "ðd",
  // Two or three voiceless fricatives:
  "fθ",
  "fθs",
  // Two voiceless stops:
  "pt",
  "kt",
  // Two voiceless stops + fricative:
  "pts",
  "kts",
  // Stop plus fricative:
  "pθ",
  "ps",
  "tθ",
  "ts",
  "dθ",
  "dz",
  "ks",
  // Lateral approximant + two or three consonants:
  "lmd",
  "lpt",
  "lps",
  "lfθ",
  "lvð",
  "lvfθ",
  "lts",
  "lst",
  "lkt",
  "lks",
  // In rhotic varieties, "r/ + two consonants:
  "rmd",
  "rmθ",
  "rpt",
  "rps",
  "rnd",
  "rts",
  "rst",
  "rld",
  "rkt",
  // Nasal + homorganic stop + stop or fricative:
  "mpt",
  "mps",
  "nts",
  "ntθ",
  "ndð",
  "ŋkt",
  "ŋks",
  "ŋkθ",
  // Nasal + homorganic stop + two fricatives:
  "ndðz",
  // Nasal + non-homorganic stop:
  "mt",
  "md",
  "ŋd",
  // Three obstruents:
  "ksθ",
  "kst",
  // Four obstruents:
  "ksθs",
  "ksθt",
  "ksts",
];

export const englishSyllableStructure = {
  onset: 3,
  nucleus: 1,
  coda: 5,
} as SyllableStructure;

export const englishPhonotactics = {
  possibilities: {
    onset: englishOnset,
    nucleus: englishNucleus,
    coda: englishCoda,
  },
  syllableStructure: englishSyllableStructure,
  possibleSyllableStructures: getPossibleSyllableStructures(
    englishSyllableStructure
  ),
} as Phonotactics;
