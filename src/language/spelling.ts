import { VoicedWord } from "./word";
import { Phoneme } from "./phoneme";

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
