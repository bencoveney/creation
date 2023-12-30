export enum WordOrder {
  /**
   * "She him loves."
   * 45%
   * Examples: Ancient Greek, Bengali, Hindi, Japanese, Turkish, Kannada, Korean, Latin, Malayalam, Persian, Sanskrit, Urdu
   */
  SOV,
  /**
   * "She loves him."
   * 42%
   * Examples: Chinese, English, French, German, Hausa, Hungarian, Italian, Malay, Russian, Spanish, Thai, Vietnamese
   */
  SVO,
  /**
   * "Loves she him."
   * 9%
   * Examples: Biblical Hebrew, Arabic, Irish, Filipino, Tuareg-Berber, Welsh
   */
  VSO,
  /**
   * "Loves him she."
   * 3%
   * Examples: Malagasy, Baure, Car
   */
  VOS,
  /**
   * "Him loves she."
   * 1%
   * Examples: Apalaí, Hixkaryana, Klingon
   */
  OVS,
  /**
   * "Him she loves."
   * 0%
   * Examples: Warao
   */
  OSV,
}
