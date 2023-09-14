import { config } from "../config";
import { History } from "../history";
import { flipCoin, randomChoice, randomInt } from "../utils/random";

export enum Phoneme {
  // Single vowels

  ɪ = "ɪ", // sh_i_p
  i_ = "i_", // sh_ee_p
  ʊ = "ʊ", // b_oo_k
  u_ = "u_", // sh_oo_t
  e = "e", // l_e_ft
  ɜ_ = "ɜ_", // h_er_
  ə = "ə", // teach_er_
  ɔ_ = "ɔ_", // d_oor_
  æ = "æ", // h_a_t
  ʌ = "ʌ", // _u_p
  ɒ = "ɒ", // _o_n
  ɑ_ = "ɑ_", // f_ar_

  // Diphthongs

  eɪ = "eɪ", // w_ai_t
  ɔɪ = "ɔɪ", // c_oi_n
  aɪ = "aɪ", // l_i_ke
  eə = "eə", // h_air_
  ɪə = "ɪə", // h_ere_
  ʊə = "ʊə", // t_our_ist
  əʊ = "əʊ", // sh_ow_
  aʊ = "aʊ", // m_ou_th

  // Unvoiced Consonants

  p = "p", // _p_ea
  f = "f", // _f_ree
  θ = "θ", // _th_ing
  t = "t", // _t_ree
  s = "s", // _s_ee
  ʃ = "ʃ", // _sh_eep
  ʧ = "ʧ", // _ch_eese
  k = "k", // _c_oin

  // Voiced consonants

  b = "b", // _b_oat
  v = "v", // _v_ideo
  ð = "ð", // _th_is
  d = "d", // _d_og
  z = "z", // _z_oo
  ʒ = "ʒ", // televi_s_ion
  ʤ = "ʤ", // _j_oke
  g = "g", // _g_o
  m = "m", // _m_ouse
  n = "n", // _n_ow
  ŋ = "ŋ", // thi_n_g
  h = "h", // _h_ope
  w = "w", // _w_e
  l = "l", // _l_ove
  r = "r", // _r_un
  j = "j", // _y_ou

  // Utils

  SyllableBreak = "|",
}

export type Phonemes = {
  singleVowels: Phoneme[];
  dipthongs: Phoneme[];
  unvoicedConstants: Phoneme[];
  voicedConstants: Phoneme[];
};

export const allPhonemes: Phonemes = {
  singleVowels: [
    Phoneme.ɪ,
    Phoneme.i_,
    Phoneme.ʊ,
    Phoneme.u_,
    Phoneme.e,
    Phoneme.ɜ_,
    Phoneme.ə,
    Phoneme.ɔ_,
    Phoneme.æ,
    Phoneme.ʌ,
    Phoneme.ɒ,
    Phoneme.ɑ_,
  ],
  dipthongs: [
    Phoneme.eɪ,
    Phoneme.ɔɪ,
    Phoneme.aɪ,
    Phoneme.eə,
    Phoneme.ɪə,
    Phoneme.ʊə,
    Phoneme.əʊ,
    Phoneme.aʊ,
  ],
  unvoicedConstants: [
    Phoneme.p,
    Phoneme.f,
    Phoneme.θ,
    Phoneme.t,
    Phoneme.s,
    Phoneme.ʃ,
    Phoneme.ʧ,
    Phoneme.k,
  ],
  voicedConstants: [
    Phoneme.b,
    Phoneme.v,
    Phoneme.ð,
    Phoneme.d,
    Phoneme.z,
    Phoneme.ʒ,
    Phoneme.ʤ,
    Phoneme.g,
    Phoneme.m,
    Phoneme.n,
    Phoneme.ŋ,
    Phoneme.h,
    Phoneme.w,
    Phoneme.l,
    Phoneme.r,
    Phoneme.j,
  ],
};

export type VoicedWord = Phoneme[];

export function spellWords(words: VoicedWord[]): string {
  return words.map((word) => spellWord(word)).join(" ");
}

export function spellWord(word: VoicedWord): string {
  return word.map((phoneme) => spellPhoneme(phoneme)).join("");
}

export function spellPhoneme(phoneme: Phoneme): string {
  switch (phoneme) {
    case Phoneme.ɪ:
      // sh_i_p
      return "i";
    case Phoneme.i_:
      // sh_ee_p
      return "ee";
    case Phoneme.ʊ:
      // b_oo_k
      return "oo";
    case Phoneme.u_:
      // sh_oo_t
      return "oo";
    case Phoneme.e:
      // l_e_ft
      return "e";
    case Phoneme.ɜ_:
      // h_er_
      return "er";
    case Phoneme.ə:
      // teach_er_
      return "er";
    case Phoneme.ɔ_:
      // d_oor_
      return "oor";
    case Phoneme.æ:
      // h_a_t
      return "a";
    case Phoneme.ʌ:
      // _u_p
      return "u";
    case Phoneme.ɒ:
      // _o_n
      return "o";
    case Phoneme.ɑ_:
      // f_ar_
      return "ar";
    case Phoneme.eɪ:
      // w_ai_t
      return "ai";
    case Phoneme.ɔɪ:
      // c_oi_n
      return "oi";
    case Phoneme.aɪ:
      // l_i_ke
      return "i";
    case Phoneme.eə:
      // h_air_
      return "air";
    case Phoneme.ɪə:
      // h_ere_
      return "ere";
    case Phoneme.ʊə:
      // t_our_ist
      return "our";
    case Phoneme.əʊ:
      // sh_ow_
      return "ow";
    case Phoneme.aʊ:
      // m_ou_th
      return "ou";
    case Phoneme.p:
      // _p_ea
      return "p";
    case Phoneme.f:
      // _f_ree
      return "f";
    case Phoneme.θ:
      // _th_ing
      return "th";
    case Phoneme.t:
      // _t_ree
      return "t";
    case Phoneme.s:
      // _s_ee
      return "s";
    case Phoneme.ʃ:
      // _sh_eep
      return "sh";
    case Phoneme.ʧ:
      // _ch_eese
      return "ch";
    case Phoneme.k:
      // _c_oin
      return "c";
    case Phoneme.b:
      // _b_oat
      return "b";
    case Phoneme.v:
      // _v_ideo
      return "v";
    case Phoneme.ð:
      // _th_is
      return "th";
    case Phoneme.d:
      // _d_og
      return "d";
    case Phoneme.z:
      // _z_oo
      return "z";
    case Phoneme.ʒ:
      // televi_s_ion
      return "s";
    case Phoneme.ʤ:
      // _j_oke
      return "j";
    case Phoneme.g:
      // _g_o
      return "g";
    case Phoneme.m:
      // _m_ouse
      return "m";
    case Phoneme.n:
      // _n_ow
      return "n";
    case Phoneme.ŋ:
      // thi_n_g
      return "n";
    case Phoneme.h:
      // _h_ope
      return "h";
    case Phoneme.w:
      // _w_e
      return "w";
    case Phoneme.l:
      // _l_ove
      return "l";
    case Phoneme.r:
      // _r_un
      return "r";
    case Phoneme.j:
      // _y_ou
      return "y";
    case Phoneme.SyllableBreak:
      // return "|";
      return "";
  }
}

type SyllableStructure = {
  minOnset: number;
  maxOnset: number;
  minNucleus: number;
  maxNucleus: number;
  minCoda: number;
  maxCoda: number;
};

export function generateSyllableStructure(): SyllableStructure {
  const minConstonants = 3;
  const onset = randomInt(0, 3);
  const coda = minConstonants - onset;
  return {
    minOnset: 0,
    maxOnset: onset,
    minNucleus: 1,
    maxNucleus: 1,
    minCoda: 0,
    maxCoda: coda,
  };
}

function generateSyllable({
  syllableStructure,
  phonemes,
}: Language): VoicedWord {
  const onset = randomInt(
    syllableStructure.minOnset,
    syllableStructure.maxOnset
  );
  const nucleus = randomInt(
    syllableStructure.minNucleus,
    syllableStructure.maxNucleus
  );
  const coda = randomInt(syllableStructure.minCoda, syllableStructure.maxCoda);
  const result: VoicedWord = [];
  for (let i = 0; i < onset; i++) {
    result.push(
      randomChoice([...phonemes.unvoicedConstants, ...phonemes.voicedConstants])
    );
  }
  for (let i = 0; i < nucleus; i++) {
    result.push(
      randomChoice([...phonemes.singleVowels, ...phonemes.dipthongs])
    );
  }
  for (let i = 0; i < coda; i++) {
    result.push(
      randomChoice([...phonemes.unvoicedConstants, ...phonemes.voicedConstants])
    );
  }
  // result.push(Phoneme.SyllableBreak);
  return result;
}

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
