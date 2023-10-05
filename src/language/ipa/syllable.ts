import { randomChoice } from "../../utils/random";
import { Consonant } from "./consonant";
import { phonemeLookup } from "./phoneme";
import { Phonotactics } from "./phonotactics";
import { syllableStructureSize } from "./syllableStructure";
import { Vowel } from "./vowels";

export type SyllableParts<TConst, TVowel> = {
  onset: TConst;

  // Rhyme
  nucleus: TVowel;
  coda: TConst;
};

export type Syllable = SyllableParts<Consonant[], Vowel[]>;

export function createSyllable(phonotactics: Phonotactics, maxSize: number) {
  const syllableStructure = randomChoice(
    phonotactics.possibleSyllableStructures.filter(
      (structure) => syllableStructureSize(structure) <= maxSize
    )
  );
  const result: Syllable = {
    onset: [],
    nucleus: [],
    coda: [],
  };
  if (syllableStructure.onset > 0) {
    const onset = randomChoice(
      phonotactics.possibilities.onset.filter(
        (onsetSize) => onsetSize.length === syllableStructure.onset
      )
    );
    const ipaCharacters = onset
      .split("")
      .map((char) => phonemeLookup[char] as Consonant);
    result.onset.push(...ipaCharacters);
  }
  if (syllableStructure.nucleus > 0) {
    const nucleus = randomChoice(
      phonotactics.possibilities.nucleus.filter(
        (nucleusSize) => nucleusSize.length === syllableStructure.nucleus
      )
    );
    const ipaCharacters = nucleus
      .split("")
      .map((char) => phonemeLookup[char] as Vowel);
    result.nucleus.push(...ipaCharacters);
  }
  if (syllableStructure.coda > 0) {
    const coda = randomChoice(
      phonotactics.possibilities.coda.filter(
        (codaSize) => codaSize.length === syllableStructure.coda
      )
    );
    const ipaCharacters = coda
      .split("")
      .map((char) => phonemeLookup[char] as Consonant);
    result.coda.push(...ipaCharacters);
  }
  return result;
}

export function spellSyllable(syllable: Syllable) {
  return `/${[...syllable.onset, ...syllable.nucleus, ...syllable.coda]
    .map((char) => char.ipaCharacter)
    .join("")}/`;
}
