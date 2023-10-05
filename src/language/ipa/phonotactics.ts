import { PhonemeKind } from "./phoneme";

export type SyllableStructure = {
  onset: number;
  rhyme: {
    nucleus: number;
    coda: number;
  };
};

export function describeSyllableStructure(
  syllableStructure: SyllableStructure
) {
  return [
    ...new Array(syllableStructure.onset).fill(PhonemeKind.Consonant),
    ...new Array(syllableStructure.rhyme.nucleus).fill(PhonemeKind.Vowel),
    ...new Array(syllableStructure.rhyme.coda).fill(PhonemeKind.Consonant),
  ];
}

export function stringifySyllableStructure(
  syllableStructure: SyllableStructure
) {
  return describeSyllableStructure(syllableStructure)
    .map((part) => (part === PhonemeKind.Consonant ? "C" : "V"))
    .join("");
}

export function syllableStructureSize(syllableStructure: SyllableStructure) {
  return (
    syllableStructure.onset +
    syllableStructure.rhyme.nucleus +
    syllableStructure.rhyme.coda
  );
}

export function getPossibleSyllableStructures(maximums: SyllableStructure) {
  const result: SyllableStructure[] = [];
  for (let nucleus = 1; nucleus <= maximums.rhyme.nucleus; nucleus++) {
    for (let onset = 0; onset <= maximums.onset; onset++) {
      for (let coda = 0; coda <= maximums.rhyme.coda; coda++) {
        result.push({
          onset,
          rhyme: {
            nucleus,
            coda,
          },
        });
      }
    }
  }
  return result.sort(
    (a, b) => syllableStructureSize(a) - syllableStructureSize(b)
  );
}

// Produces all possible combinations.
// Output is big. Essentially Math.pow(values.length, length)
export function getPossibilities(length: number, values: string[]): string[] {
  if (length === 0) {
    return [];
  }
  if (length === 1) {
    return values;
  }
  return getPossibilities(length - 1, values)
    .map((possibility) => values.map((value) => `${value}${possibility}`))
    .flat(1);
}
