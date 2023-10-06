import { spellSyllable } from "../ipa/syllable";
import { Morpheme, MorphemeKind } from "./morpheme";

export type AffixedWord = {
  kind: "affix";
  affix: Morpheme;
  stem: Word;
};

export type RootWord = {
  kind: "root";
  root: Morpheme;
};

export type Word = AffixedWord | RootWord;

export function createRootWord(root: Morpheme): RootWord {
  return {
    kind: "root",
    root,
  };
}

export function addAffix(stem: Word, affix: Morpheme): AffixedWord {
  return {
    kind: "affix",
    affix,
    stem,
  };
}

export function describeWord(word: Word): string {
  switch (word.kind) {
    case "root":
      return word.root.concept;
    case "affix":
      return `${describeWord(word.stem)} ${word.affix.concept}`;
  }
}

export function spellWord(word: Word): string {
  switch (word.kind) {
    case "root":
      return spellSyllable(word.root.syllable);
    case "affix":
      switch (word.affix.kind) {
        case MorphemeKind.Prefix:
          return `${spellSyllable(word.affix.syllable)}${spellWord(word.stem)}`;
        case MorphemeKind.Suffix:
          return `${spellWord(word.stem)}${spellSyllable(word.affix.syllable)}`;
        case MorphemeKind.Root:
          throw new Error("what");
      }
  }
}
