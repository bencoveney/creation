import { config } from "../../config";
import { randomChoice } from "../../utils/random";
import { consonantsByIpaCharacter } from "../ipa/consonant";
import {
  Syllable,
  SyllableStructure,
  syllableStructureSize,
} from "../ipa/phonotactics";
import { vowelsByIpaCharacter } from "../ipa/vowels";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export type RootWord = {
  concept: string;
  syllables: Syllable[];
};

export function createRootWord(
  concept: string,
  possibleOnset: string[],
  possibleNucleus: string[],
  possibleCoda: string[],
  syllableStructures: SyllableStructure[]
): RootWord {
  const syllableStructure = randomChoice(
    syllableStructures.filter(
      (structure) => syllableStructureSize(structure) <= 3
    )
  );
  const result: RootWord = {
    concept,
    syllables: [
      {
        onset: [],
        rhyme: {
          nucleus: [],
          coda: [],
        },
      },
    ],
  };
  if (syllableStructure.onset > 0) {
    const onset = randomChoice(
      possibleOnset.filter(
        (onsetSize) => onsetSize.length === syllableStructure.onset
      )
    );
    const ipaCharacters = onset
      .split("")
      .map((char) => consonantsByIpaCharacter[char]);
    result.syllables[0].onset.push(...ipaCharacters);
  }
  if (syllableStructure.rhyme.nucleus > 0) {
    const nucleus = randomChoice(
      possibleNucleus.filter(
        (nucleusSize) => nucleusSize.length === syllableStructure.rhyme.nucleus
      )
    );
    const ipaCharacters = nucleus
      .split("")
      .map((char) => vowelsByIpaCharacter[char]);
    result.syllables[0].rhyme.nucleus.push(...ipaCharacters);
  }
  if (syllableStructure.rhyme.coda > 0) {
    const coda = randomChoice(
      possibleCoda.filter(
        (codaSize) => codaSize.length === syllableStructure.rhyme.coda
      )
    );
    const ipaCharacters = coda
      .split("")
      .map((char) => consonantsByIpaCharacter[char]);
    result.syllables[0].rhyme.coda.push(...ipaCharacters);
  }
  return result;
}

export function createRootWords(
  possibleOnset: string[],
  possibleNucleus: string[],
  possibleCoda: string[],
  syllableStructures: SyllableStructure[]
): RootWord[] {
  return rootConcepts.map((concept) =>
    createRootWord(
      concept,
      possibleOnset,
      possibleNucleus,
      possibleCoda,
      syllableStructures
    )
  );
}
