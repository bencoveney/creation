import { History } from "../worldgen";
import { getWord, spellWord } from "../worldgen/language";
import { CommaSeparate } from "./commaSeparate";
import { Tooltip } from "./tooltip";

export function Names({ name, history }: { name: string; history: History }) {
  const translations = [...history.dialects.map.entries()].map(
    ([dialectName, dialect]) => [
      dialectName,
      spellWord(getWord(dialect.language.name, dialect.language)),
      spellWord(getWord(name, dialect.language)),
    ]
  );
  return (
    <div>
      Known as{" "}
      <CommaSeparate>
        {translations.map(([dialectName, languageName, word]) => (
          <Tooltip
            label={`From the language ${languageName}`}
            key={dialectName}
          >
            {word}
          </Tooltip>
        ))}
      </CommaSeparate>
    </div>
  );
}
