import { SyllableParts } from "./syllable";
import { SyllableStructure } from "./syllableStructure";

export type Phonotactics = {
  possibilities: SyllableParts<string[], string[]>;
  syllableStructure: SyllableStructure;
  possibleSyllableStructures: SyllableStructure[];
};
