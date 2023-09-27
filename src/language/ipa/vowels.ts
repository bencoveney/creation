// https://en.wikipedia.org/wiki/International_Phonetic_Alphabet#Vowels

export enum Backness {
  "Front",
  "Near-front",
  "Central",
  "Near-back",
  "Back",
}

export enum Height {
  "Close",
  "Near-close",
  "Close-mid",
  "Mid",
  "Open-mid",
  "Near-open",
  "Open",
}

export enum Roundedness {
  "Rounded",
  "Unrounded",
  "None",
}

export type Vowel = {
  backness: Backness;
  height: Height;
  roundedness: Roundedness;
  ipaCharacter: string;
  name: string;
  // ipaNumber: number;
  // ipaUnicode: string;
};

export const vowels: Vowel[] = [
  {
    // https://en.wikipedia.org/wiki/Close_front_unrounded_vowel
    name: "Close front unrounded vowel",
    ipaCharacter: "i",
    height: Height.Close,
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close_front_rounded_vowel
    name: "Close front rounded vowel",
    ipaCharacter: "y",
    height: Height.Close,
    backness: Backness.Front,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close_central_unrounded_vowel
    name: "Close central unrounded vowel",
    ipaCharacter: "ɨ",
    height: Height.Close,
    backness: Backness.Central,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close_central_rounded_vowel
    name: "Close central rounded vowel",
    ipaCharacter: "ʉ",
    height: Height.Close,
    backness: Backness.Central,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close_back_unrounded_vowel
    name: "Close back unrounded vowel",
    ipaCharacter: "ɯ",
    height: Height.Close,
    backness: Backness.Back,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close_back_rounded_vowel
    name: "Close back rounded vowel",
    ipaCharacter: "u",
    height: Height.Close,
    backness: Backness.Back,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Near-close_near-front_unrounded_vowel
    name: "Near-close near-front unrounded vowel",
    ipaCharacter: "ɪ",
    height: Height["Near-close"],
    backness: Backness["Near-front"],
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Near-close_near-front_rounded_vowel
    name: "Near-close near-front rounded vowel",
    ipaCharacter: "ʏ",
    height: Height["Near-close"],
    backness: Backness["Near-front"],
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Near-close_near-back_rounded_vowel
    name: "Near-close near-back rounded vowel",
    ipaCharacter: "ʊ",
    height: Height["Near-close"],
    backness: Backness["Near-back"],
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_front_unrounded_vowel
    name: "Close-mid front unrounded vowel",
    ipaCharacter: "e",
    height: Height["Close-mid"],
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_front_rounded_vowel
    name: "Close-mid front rounded vowel",
    ipaCharacter: "ø",
    height: Height["Close-mid"],
    backness: Backness.Front,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_central_unrounded_vowel
    name: "Close-mid central unrounded vowel",
    ipaCharacter: "ɘ",
    height: Height["Close-mid"],
    backness: Backness.Central,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_central_rounded_vowel
    name: "Close-mid central rounded vowel",
    ipaCharacter: "ɵ",
    height: Height["Close-mid"],
    backness: Backness.Central,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_back_unrounded_vowel
    name: "Close-mid back unrounded vowel",
    ipaCharacter: "ɤ",
    height: Height["Close-mid"],
    backness: Backness.Back,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Close-mid_back_rounded_vowel
    name: "Close-mid back rounded vowel",
    ipaCharacter: "o",
    height: Height["Close-mid"],
    backness: Backness.Back,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Mid_front_unrounded_vowel
    name: "Mid front unrounded vowel",
    ipaCharacter: "e̞",
    height: Height.Mid,
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Mid_front_rounded_vowel
    name: "Mid front rounded vowel",
    ipaCharacter: "ø̞",
    height: Height.Mid,
    backness: Backness.Front,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Mid_central_vowel
    name: "Mid central vowel",
    ipaCharacter: "ə",
    height: Height.Mid,
    backness: Backness.Central,
    roundedness: Roundedness.None,
  },
  {
    // https://en.wikipedia.org/wiki/Mid_back_unrounded_vowel
    name: "Mid back unrounded vowel",
    ipaCharacter: "ɤ̞",
    height: Height.Mid,
    backness: Backness.Back,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Mid_back_rounded_vowel
    name: "Mid back rounded vowel",
    ipaCharacter: "o̞",
    height: Height.Mid,
    backness: Backness.Back,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_front_unrounded_vowel
    name: "Open-mid front unrounded vowel",
    ipaCharacter: "ɛ",
    height: Height["Open-mid"],
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_front_rounded_vowel
    name: "Open-mid front rounded vowel",
    ipaCharacter: "œ",
    height: Height["Open-mid"],
    backness: Backness.Front,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_central_unrounded_vowel
    name: "Open-mid central unrounded vowel",
    ipaCharacter: "ɜ",
    height: Height["Open-mid"],
    backness: Backness.Central,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_central_rounded_vowel
    name: "Open-mid central rounded vowel",
    ipaCharacter: "ɞ",
    height: Height["Open-mid"],
    backness: Backness.Central,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_back_unrounded_vowel
    name: "Open-mid back unrounded vowel",
    ipaCharacter: "ʌ",
    height: Height["Open-mid"],
    backness: Backness.Back,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open-mid_back_rounded_vowel
    name: "Open-mid back rounded vowel",
    ipaCharacter: "ɔ",
    height: Height["Open-mid"],
    backness: Backness.Back,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Near-open_front_unrounded_vowel
    name: "Near-open front unrounded vowel",
    ipaCharacter: "æ",
    height: Height["Near-open"],
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Near-open_central_vowel
    name: "Near-open central vowel",
    ipaCharacter: "ɐ",
    height: Height["Near-open"],
    backness: Backness.Central,
    roundedness: Roundedness.None,
  },
  {
    // https://en.wikipedia.org/wiki/Open_front_unrounded_vowel
    name: "Open front unrounded vowel",
    ipaCharacter: "a",
    height: Height.Open,
    backness: Backness.Front,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open_front_rounded_vowel
    name: "Open front rounded vowel",
    ipaCharacter: "ɶ",
    height: Height.Open,
    backness: Backness.Front,
    roundedness: Roundedness.Rounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open_central_unrounded_vowel
    name: "Open central unrounded vowel",
    ipaCharacter: "ä",
    height: Height.Open,
    backness: Backness.Central,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open_back_unrounded_vowel
    name: "Open back unrounded vowel",
    ipaCharacter: "ɑ",
    height: Height.Open,
    backness: Backness.Back,
    roundedness: Roundedness.Unrounded,
  },
  {
    // https://en.wikipedia.org/wiki/Open_back_rounded_vowel
    name: "Open back rounded vowel",
    ipaCharacter: "ɒ",
    height: Height.Open,
    backness: Backness.Back,
    roundedness: Roundedness.Rounded,
  },
];
