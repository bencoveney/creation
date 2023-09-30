/*
  https://en.wikipedia.org/wiki/International_Phonetic_Alphabet#Consonants

  Missing:
  - Non-pulmonic
  - Affricates
  - Co-articulated
*/

import {
  ByIpaCharacter,
  HasIpaCharacter,
  createIpaCharacterLookup,
} from "./utils";

export enum ArticulationPlace {
  // Articulated with both lips.
  // https://en.wikipedia.org/wiki/Bilabial_consonant
  "Bilabial",
  // Articulated with the lower lip and the upper teeth.
  // https://en.wikipedia.org/wiki/Labiodental_consonant
  "Labiodental",
  // Articulated by placing the tongue tip or blade against the upper lip, which is drawn downward to meet the tongue.
  // https://en.wikipedia.org/wiki/Linguolabial_consonant
  "Linguolabial",
  // Articulated with the tongue against the upper teeth.
  // https://en.wikipedia.org/wiki/Dental_consonant
  "Dental",
  // Articulated with the tongue against or close to the superior alveolar ridge.
  // https://en.wikipedia.org/wiki/Alveolar_consonant
  "Alveolar",
  // Articulated with the tongue near or touching the back of the alveolar ridge.
  // https://en.wikipedia.org/wiki/Postalveolar_consonant
  "Postalveolar",
  // Articulated between the alveolar ridge and the hard palate.
  // https://en.wikipedia.org/wiki/Retroflex_consonant
  "Retroflex",
  // Articulated with the body of the tongue raised against the hard palate.
  // https://en.wikipedia.org/wiki/Palatal_consonant
  "Palatal",
  // Articulated with the back part of the tongue (the dorsum) against the soft palate.
  // https://en.wikipedia.org/wiki/Velar_consonant
  "Velar",
  // Articulated with the back of the tongue against or near the uvula.
  // https://en.wikipedia.org/wiki/Uvular_consonant
  "Uvular",
  // Articulated primarily in the pharynx.
  // https://en.wikipedia.org/wiki/Pharyngeal_consonant
  "Pharyngeal/epiglottal",
  // Using the glottis as their primary articulation.
  // https://en.wikipedia.org/wiki/Glottal_consonant
  "Glottal",
  // Simultaneously labialized and palatalized.
  // https://en.wikipedia.org/wiki/Labio-palatalization
  "Labial-Palatal",
  // Simultaneously labialized and velarized.
  // https://en.wikipedia.org/wiki/Labialized_velar_consonant
  "Labial-Velar",
  // TODO: Restructure...
  "Variable",
}

export enum ArticulationManner {
  // An occlusive consonant produced with a lowered velum, allowing air to escape freely through the nose.
  // https://en.wikipedia.org/wiki/Nasal_consonant
  "Nasal",
  // A pulmonic consonant in which the vocal tract is blocked so that all airflow ceases.
  // https://en.wikipedia.org/wiki/Plosive
  "Plosive",
  // A consonant produced by forcing air through a narrow channel made by placing two articulators close together.
  // When forming a sibilant, one still is forcing air through a narrow channel, but in addition, the tongue is curled lengthwise to direct the air over the edge of the teeth.
  // https://en.wikipedia.org/wiki/Fricative
  "Sibilant fricative",
  // a consonant produced by forcing air through a narrow channel made by placing two articulators close together.
  // https://en.wikipedia.org/wiki/Fricative
  "Non-sibilant fricative",
  // Involve the articulators approaching each other but not narrowly enough[1] nor with enough articulatory precision[2] to create turbulent airflow.
  // https://en.wikipedia.org/wiki/Approximant
  "Approximant",
  // Produced with a single contraction of the muscles so that one articulator (such as the tongue) is thrown against another.
  // https://en.wikipedia.org/wiki/Tap_and_flap_consonants
  "Tap/flap",
  // Produced by vibrations between the active articulator and passive articulator.
  // https://en.wikipedia.org/wiki/Trill_consonant
  "Trill",
  // https://en.wikipedia.org/wiki/Lateral_consonant#Fricatives
  "Lateral fricative",
  // https://en.wikipedia.org/wiki/Lateral_consonant#Approximants
  "Lateral approximant",
  // https://en.wikipedia.org/wiki/Lateral_consonant#Flaps
  "Lateral tap/flap",
  // TODO: Restructure...
  "Fricative",
}

// https://en.wikipedia.org/wiki/Obstruent
// Formed by obstructing airflow
export const obstruent: ArticulationManner[] = [
  ArticulationManner.Plosive,
  ArticulationManner["Sibilant fricative"],
  ArticulationManner["Non-sibilant fricative"],
];

// https://en.wikipedia.org/wiki/Sonorant
// Produced with continuous, non-turbulent airflow
export const sonorant: ArticulationManner[] = [
  ArticulationManner.Nasal,
  ArticulationManner.Approximant,
  ArticulationManner["Tap/flap"],
  ArticulationManner.Trill,
];

export enum Voicing {
  "Voiced",
  "Voiceless",
}

export type Consonant = {
  place: ArticulationPlace;
  manner: ArticulationManner;
  voicing: Voicing;
  name: string;
  // ipaNumber: number;
  // ipaUnicode: string;
} & HasIpaCharacter;

export const consonants: Consonant[] = [
  {
    // https://en.wikipedia.org/wiki/Voiceless_bilabial_nasal
    name: "Voiceless bilabial nasal",
    ipaCharacter: "m̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_bilabial_nasal
    name: "Voiced bilabial nasal",
    ipaCharacter: "m",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labiodental_nasal
    name: "Voiced labiodental nasal",
    ipaCharacter: "ɱ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_linguolabial_nasal
    name: "Voiced linguolabial nasal",
    ipaCharacter: "n̼",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_nasal
    name: "Voiceless alveolar nasal",
    ipaCharacter: "n̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_nasal
    name: "Voiced alveolar nasal",
    ipaCharacter: "n",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_nasal
    name: "Voiceless retroflex nasal",
    ipaCharacter: "ɳ̊",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_nasal
    name: "Voiced retroflex nasal",
    ipaCharacter: "ɳ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_palatal_nasal
    name: "Voiceless palatal nasal",
    ipaCharacter: "ɲ̊",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_nasal
    name: "Voiced palatal nasal",
    ipaCharacter: "ɲ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_velar_nasal
    name: "Voiceless velar nasal",
    ipaCharacter: "ŋ̊",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_nasal
    name: "Voiced velar nasal",
    ipaCharacter: "ŋ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_uvular_nasal
    name: "Voiceless uvular nasal",
    ipaCharacter: "ɴ̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_nasal
    name: "Voiced uvular nasal",
    ipaCharacter: "ɴ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_bilabial_plosive
    name: "Voiceless bilabial plosive",
    ipaCharacter: "p",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_bilabial_plosive
    name: "Voiced bilabial plosive",
    ipaCharacter: "b",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_labiodental_plosive
    name: "Voiceless labiodental plosive",
    ipaCharacter: "p̪",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labiodental_plosive
    name: "Voiced labiodental plosive",
    ipaCharacter: "b̪",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner.Nasal,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_linguolabial_plosive
    name: "Voiceless linguolabial plosive",
    ipaCharacter: "t̼",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_linguolabial_plosive
    name: "Voiced linguolabial plosive",
    ipaCharacter: "d̼",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_plosive
    name: "Voiceless alveolar plosive",
    ipaCharacter: "t",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_plosive
    name: "Voiced alveolar plosive",
    ipaCharacter: "d",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_plosive
    name: "Voiceless retroflex plosive",
    ipaCharacter: "ʈ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_plosive
    name: "Voiced retroflex plosive",
    ipaCharacter: "ɖ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_palatal_plosive
    name: "Voiceless palatal plosive",
    ipaCharacter: "c",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_plosive
    name: "Voiced palatal plosive",
    ipaCharacter: "ɟ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_velar_plosive
    name: "Voiceless velar plosive",
    ipaCharacter: "k",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_plosive
    name: "Voiced velar plosive",
    ipaCharacter: "ɡ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_uvular_plosive
    name: "Voiceless uvular plosive",
    ipaCharacter: "q",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_plosive
    name: "Voiced uvular plosive",
    ipaCharacter: "ɢ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Epiglottal_plosive
    name: "Epiglottal plosive",
    ipaCharacter: "ʡ",
    voicing: Voicing.Voiceless, // Iffy
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Glottal_stop
    name: "Glottal stop",
    ipaCharacter: "ʔ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Glottal,
    manner: ArticulationManner.Plosive,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_fricative
    name: "Voiceless alveolar fricative",
    ipaCharacter: "s",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_fricative
    name: "Voiced alveolar fricative",
    ipaCharacter: "z",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_postalveolar_fricative
    name: "Voiceless postalveolar fricative",
    ipaCharacter: "ʃ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Postalveolar,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_postalveolar_fricative
    name: "Voiced postalveolar fricative",
    ipaCharacter: "ʒ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Postalveolar,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_fricative
    name: "Voiceless retroflex fricative",
    ipaCharacter: "ʂ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_fricative
    name: "Voiced retroflex fricative",
    ipaCharacter: "ʐ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolo-palatal_fricative
    name: " Voiceless alveolo-palatal fricative",
    ipaCharacter: "ɕ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Palatal, // alveolo-palatal
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolo-palatal_fricative
    name: "Voiced alveolo-palatal fricative",
    ipaCharacter: "ʑ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal, // alveolo-palatal
    manner: ArticulationManner["Sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_bilabial_fricative
    name: "Voiceless bilabial fricative",
    ipaCharacter: "ɸ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_bilabial_fricative
    name: "Voiced bilabial fricative",
    ipaCharacter: "β",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_labiodental_fricative
    name: "Voiceless labiodental fricative",
    ipaCharacter: "f",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labiodental_fricative
    name: "Voiced labiodental fricative",
    ipaCharacter: "v",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_linguolabial_fricative
    name: "Voiceless linguolabial fricative",
    ipaCharacter: "θ̼",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_linguolabial_fricative
    name: "Voiced linguolabial fricative",
    ipaCharacter: "ð̼",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_dental_fricative
    name: "Voiceless dental fricative",
    ipaCharacter: "θ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Dental,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_dental_fricative
    name: "Voiced dental fricative",
    ipaCharacter: "ð",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Dental,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_non-sibilant_fricative
    name: "Voiceless alveolar non-sibilant fricative",
    ipaCharacter: "θ̠",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_non-sibilant_fricative
    name: "Voiced alveolar non-sibilant fricative",
    ipaCharacter: "ð̠",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_postalveolar_non-sibilant_fricative
    name: "Voiceless postalveolar non-sibilant fricative ",
    ipaCharacter: "ɹ̠̊˔",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Postalveolar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_postalveolar_non-sibilant_fricative
    name: "Voiced postalveolar non-sibilant fricative ",
    ipaCharacter: "ɹ̠˔",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Postalveolar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_non-sibilant_fricative
    name: "Voiceless retroflex non-sibilant fricative ",
    ipaCharacter: "ɻ̊˔",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_non-sibilant_fricative
    name: "Voiced retroflex non-sibilant fricative ",
    ipaCharacter: "ɻ˔",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_palatal_fricative
    name: "Voiceless palatal fricative",
    ipaCharacter: "ç",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_fricative
    name: "Voiced palatal fricative",
    ipaCharacter: "ʝ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_velar_fricative
    name: "Voiceless velar fricative",
    ipaCharacter: "x",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_fricative
    name: "Voiced velar fricative",
    ipaCharacter: "ɣ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_uvular_fricative
    name: "Voiceless uvular fricative",
    ipaCharacter: "χ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_fricative
    name: "Voiced uvular fricative",
    ipaCharacter: "ʁ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_pharyngeal_fricative
    name: "Voiceless pharyngeal fricative",
    ipaCharacter: "ħ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_pharyngeal_fricative
    name: "Voiced pharyngeal fricative",
    ipaCharacter: "ʕ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_glottal_fricative
    name: "Voiceless glottal fricative",
    ipaCharacter: "h",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Glottal,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_glottal_fricative
    name: "Voiced glottal fricative",
    ipaCharacter: "ɦ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Glottal,
    manner: ArticulationManner["Non-sibilant fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labiodental_approximant
    name: "Voiced labiodental approximant",
    ipaCharacter: "ʋ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_approximant
    name: "Voiced alveolar approximant",
    ipaCharacter: "ɹ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_approximant
    name: "Voiced retroflex approximant",
    ipaCharacter: "ɻ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_approximant
    name: "Voiced palatal approximant",
    ipaCharacter: "j",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_approximant
    name: "Voiced velar approximant",
    ipaCharacter: "ɰ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Creaky-voiced_glottal_approximant
    name: "Creaky-voiced glottal approximant",
    ipaCharacter: "ʔ̞",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Glottal,
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_bilabial_flap
    name: "Voiced bilabial flap",
    ipaCharacter: "ⱱ̟",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labiodental_flap
    name: "Voiced labiodental flap",
    ipaCharacter: "ⱱ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Labiodental,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_linguolabial_tap
    name: "Voiced linguolabial tap",
    ipaCharacter: "ɾ̼",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Linguolabial,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_tap
    name: "Voiceless alveolar tap",
    ipaCharacter: "ɾ̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_taps_and_flaps
    name: "Voiced dental and alveolar taps and flaps",
    ipaCharacter: "ɾ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Dental, // dental and alveolar
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_flap
    name: "Voiceless retroflex flap",
    ipaCharacter: "ɽ̊",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_flap
    name: "Voiced retroflex flap",
    ipaCharacter: "ɽ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_tap_and_flap
    name: "Voiced uvular tap and flap",
    ipaCharacter: "ɢ̆",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_epiglottal_tap
    name: "Voiced epiglottal tap",
    ipaCharacter: "ʡ̆",
    voicing: Voicing.Voiced,
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner["Tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_bilabial_trill
    name: "Voiceless bilabial trill",
    ipaCharacter: "ʙ̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_bilabial_trill
    name: "Voiced bilabial trill",
    ipaCharacter: "ʙ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Bilabial,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_trill
    name: "Voiceless alveolar trill",
    ipaCharacter: "r̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_trill
    name: "Voiced alveolar trill",
    ipaCharacter: "r",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_trill
    name: "Voiceless retroflex trill ",
    ipaCharacter: "ɽ̊r̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_trill
    name: "Voiced retroflex trill ",
    ipaCharacter: "ɽr",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_uvular_trill
    name: "Voiceless uvular trill",
    ipaCharacter: "ʀ̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_trill
    name: "Voiced uvular trill",
    ipaCharacter: "ʀ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_epiglottal_trill
    name: "Voiceless epiglottal trill",
    ipaCharacter: "ʜ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_epiglottal_trill
    name: "Voiced epiglottal trill",
    ipaCharacter: "ʢ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace["Pharyngeal/epiglottal"],
    manner: ArticulationManner.Trill,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_lateral_fricative
    name: "Voiceless alveolar lateral fricative",
    ipaCharacter: "ɬ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_lateral_fricative
    name: "Voiced alveolar lateral fricative",
    ipaCharacter: "ɮ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_lateral_fricative
    name: "Voiceless retroflex lateral fricative",
    ipaCharacter: "ꞎ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_lateral_fricative
    name: "Voiced retroflex lateral fricative",
    ipaCharacter: "𝼅",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_palatal_lateral_fricative
    name: "Voiceless palatal lateral fricative",
    ipaCharacter: "𝼆",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_lateral_fricative
    name: "Voiced palatal lateral fricative",
    ipaCharacter: "ʎ̝",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_velar_lateral_fricative
    name: "Voiceless velar lateral fricative",
    ipaCharacter: "𝼄",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_lateral_fricative
    name: "Voiced velar lateral fricative",
    ipaCharacter: "ʟ̝",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Lateral fricative"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_lateral_approximant
    name: "Voiced alveolar lateral approximant",
    ipaCharacter: "l",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Lateral approximant"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_lateral_approximant
    name: "Voiced retroflex lateral approximant",
    ipaCharacter: "ɭ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Lateral approximant"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_lateral_approximant
    name: "Voiced palatal lateral approximant",
    ipaCharacter: "ʎ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Lateral approximant"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_lateral_approximant
    name: "Voiced velar lateral approximant",
    ipaCharacter: "ʟ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Lateral approximant"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_uvular_lateral_approximant
    name: "Voiced uvular lateral approximant",
    ipaCharacter: "ʟ̠",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Uvular,
    manner: ArticulationManner["Lateral approximant"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_alveolar_lateral_flap
    name: "Voiceless alveolar lateral flap",
    ipaCharacter: "ɺ̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_alveolar_lateral_flap
    name: "Voiced alveolar lateral flap",
    ipaCharacter: "ɺ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Alveolar,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_retroflex_lateral_flap
    name: "Voiceless retroflex lateral flap",
    ipaCharacter: "𝼈̥",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_retroflex_lateral_flap
    name: "Voiced retroflex lateral flap",
    ipaCharacter: "𝼈",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Retroflex,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_palatal_lateral_flap
    name: "Voiced palatal lateral flap",
    ipaCharacter: "ʎ̆",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Palatal,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_velar_lateral_tap
    name: "Voiced velar lateral tap",
    ipaCharacter: "ʟ̆",
    voicing: Voicing.Voiced,
    place: ArticulationPlace.Velar,
    manner: ArticulationManner["Lateral tap/flap"],
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_labial-palatal_fricative
    name: "Voiceless labial-palatal fricative",
    ipaCharacter: "ɥ̊",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace["Labial-Palatal"],
    manner: ArticulationManner.Fricative,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labial-palatal_approximant
    name: "Voiced labial-palatal approximant",
    ipaCharacter: "ɥ",
    voicing: Voicing.Voiced,
    place: ArticulationPlace["Labial-Palatal"],
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Voiceless_labial-velar_fricative
    name: "Voiceless labial-velar fricative",
    ipaCharacter: "ʍ",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace["Labial-Velar"],
    manner: ArticulationManner.Fricative,
  },
  {
    // https://en.wikipedia.org/wiki/Voiced_labial-velar_approximant
    name: "Voiced labial-velar approximant",
    ipaCharacter: "w",
    voicing: Voicing.Voiced,
    place: ArticulationPlace["Labial-Velar"],
    manner: ArticulationManner.Approximant,
  },
  {
    // https://en.wikipedia.org/wiki/Sj-sound
    name: "ɧ",
    ipaCharacter: "Sj-sound",
    voicing: Voicing.Voiceless,
    place: ArticulationPlace.Variable,
    manner: ArticulationManner.Fricative,
  },
];

export const consonantsByIpaCharacter: ByIpaCharacter<Consonant> =
  createIpaCharacterLookup(consonants);
