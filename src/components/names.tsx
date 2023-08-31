import { History } from "../worldgen";
import { getWord, spellWord } from "../worldgen/language";

export function Names({ name, history }: { name: string; history: History }) {
  const translations = [...history.dialects.map.entries()].map(
    ([dialectName, dialect]) => [
      dialectName,
      spellWord(getWord(dialect.language.name, dialect.language)),
      spellWord(getWord(name, dialect.language)),
    ]
  );
  return (
    <ul>
      {translations.map(([dialectName, languageName, word]) => (
        <li key={dialectName}>
          {languageName}: {word}
        </li>
      ))}
    </ul>
  );
}
