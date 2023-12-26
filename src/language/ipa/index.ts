import { stringifySyllableStructure } from "./syllableStructure";
import { HasNames } from "../names";
import { Language, spellNameWord } from "..";

export function validate(hasNames: HasNames[], language: Language) {
  console.log("onset", language.phonotactics.possibilities.onset);
  console.log("nucleus", language.phonotactics.possibilities.nucleus);
  console.log("coda", language.phonotactics.possibilities.coda);
  console.log(
    "syllableStructure",
    stringifySyllableStructure(language.phonotactics.syllableStructure)
  );
  console.log(
    "possibleSyllables",
    language.phonotactics.possibleSyllableStructures.map((syllableStructure) =>
      stringifySyllableStructure(syllableStructure)
    )
  );
  console.log(
    hasNames.map((hasNames) => {
      return `${hasNames.names.defaultKey} => ${spellNameWord(
        hasNames,
        language
      )}`;
    })
  );
  console.log([...language.registry.knownWords.values()]);
}
