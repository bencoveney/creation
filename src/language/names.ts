import { createRegistryKey } from "./morphology/wordRegistry";

export function createNames(root: string, affixes: string[] = []) {
  return {
    defaultKey: createRegistryKey(root, affixes),
  };
}

// Map from a language to the concept, to be used in the word conceptLookup.
export type Names = {
  defaultKey: string;
  [languageId: string]: string;
};

export type HasNames = {
  names: Names;
};
