import { randomChoice } from "../../utils/random";
import { Consonant } from "./consonant";
import { phonemeLookup } from "./phoneme";
import { SyllableStructure, syllableStructureSize } from "./phonotactics";
import { Vowel } from "./vowels";

export type Syllable = {
  onset: Consonant[];
  rhyme: {
    nucleus: Vowel[];
    coda: Consonant[];
  };
};

export function createSyllable(
  syllableStructures: SyllableStructure[],
  possibleOnset: string[],
  possibleNucleus: string[],
  possibleCoda: string[],
  maxSize: number
) {
  const syllableStructure = randomChoice(
    syllableStructures.filter(
      (structure) => syllableStructureSize(structure) <= maxSize
    )
  );
  const result: Syllable = {
    onset: [],
    rhyme: {
      nucleus: [],
      coda: [],
    },
  };
  if (syllableStructure.onset > 0) {
    const onset = randomChoice(
      possibleOnset.filter(
        (onsetSize) => onsetSize.length === syllableStructure.onset
      )
    );
    const ipaCharacters = onset
      .split("")
      .map((char) => phonemeLookup[char] as Consonant);
    result.onset.push(...ipaCharacters);
  }
  if (syllableStructure.rhyme.nucleus > 0) {
    const nucleus = randomChoice(
      possibleNucleus.filter(
        (nucleusSize) => nucleusSize.length === syllableStructure.rhyme.nucleus
      )
    );
    const ipaCharacters = nucleus
      .split("")
      .map((char) => phonemeLookup[char] as Vowel);
    result.rhyme.nucleus.push(...ipaCharacters);
  }
  if (syllableStructure.rhyme.coda > 0) {
    const coda = randomChoice(
      possibleCoda.filter(
        (codaSize) => codaSize.length === syllableStructure.rhyme.coda
      )
    );
    const ipaCharacters = coda
      .split("")
      .map((char) => phonemeLookup[char] as Consonant);
    result.rhyme.coda.push(...ipaCharacters);
  }
  return result;
}

export function spellSyllable(syllable: Syllable) {
  return `/${[
    ...syllable.onset,
    ...syllable.rhyme.nucleus,
    ...syllable.rhyme.coda,
  ]
    .map((char) => char.ipaCharacter)
    .join("")}/`;
}
