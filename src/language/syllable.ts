import { randomChoice, randomInt } from "../utils/random";
import { Language } from ".";
import { VoicedWord } from "./word";

export type SyllableStructure = {
  minOnset: number;
  maxOnset: number;
  minNucleus: number;
  maxNucleus: number;
  minCoda: number;
  maxCoda: number;
};

export function generateSyllableStructure(): SyllableStructure {
  const minConsonants = 3;
  const onset = randomInt(0, 3);
  const coda = minConsonants - onset;
  return {
    minOnset: 0,
    maxOnset: onset,
    minNucleus: 1,
    maxNucleus: 1,
    minCoda: 0,
    maxCoda: coda,
  };
}

export function generateSyllable({
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
