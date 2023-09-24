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
