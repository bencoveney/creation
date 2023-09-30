export function findValues(
  set: HasIpaCharacter[],
  find: string[]
): { found: string[]; missing: string[] } {
  const found: string[] = [];
  const missing: string[] = [];
  for (let index = 0; index < find.length; index++) {
    const toFind = stripDiacritics(find[index]);
    if (toFind.length > 1) {
      const parts = toFind.split("");
      const match = parts.every((partToFind) =>
        set.find((potential) => potential.ipaCharacter === partToFind)
      );
      if (match) {
        found.push(toFind);
      } else {
        missing.push(toFind);
      }
    } else {
      const match = set.find((potential) => potential.ipaCharacter === toFind);
      if (match) {
        found.push(toFind);
      } else {
        missing.push(toFind);
      }
    }
  }
  return { found, missing };
}

// https://en.wikipedia.org/wiki/International_Phonetic_Alphabet#Diacritics_and_prosodic_notation
export function stripDiacritics(value: string): string {
  // Lol
  return value.replaceAll("ː", "");
}

export type HasIpaCharacter = { ipaCharacter: string };

export type ByIpaCharacter<T extends HasIpaCharacter> = { [char: string]: T };
export function createIpaCharacterLookup<T extends HasIpaCharacter>(
  values: T[]
): ByIpaCharacter<T> {
  const result: ByIpaCharacter<T> = {};
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    result[value.ipaCharacter] = value;
  }
  return result;
}
