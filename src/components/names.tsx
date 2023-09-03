import { lookupEntries } from "../utils/lookup";
import { History } from "../worldgen";
import { getWord, getWords, spellWord, spellWords } from "../worldgen/language";
import { CommaSeparate } from "./commaSeparate";
import { Name } from "./name";

export function Names({ name, history }: { name: string; history: History }) {
  const translations = lookupEntries(history.dialects).map(
    ([dialectName, dialect]) => [
      dialectName,
      spellWord(getWord(dialect.language.name, dialect.language)),
      spellWords(getWords(name, dialect.language)),
    ]
  );
  return (
    <div>
      Known as{" "}
      <CommaSeparate>
        {translations.map(([dialectName, languageName, word]) => (
          <Name key={dialectName} languageName={languageName} word={word} />
        ))}
      </CommaSeparate>
    </div>
  );
}
