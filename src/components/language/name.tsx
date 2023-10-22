import { Language, spellNameWord } from "../../language";
import { HasNames } from "../../language/names";
import { Tooltip } from "../layout/tooltip";

export function Name({
  language,
  named,
}: {
  language: Language;
  named: HasNames;
}) {
  const languageName = spellNameWord(language, language);
  return (
    <Tooltip label={languageName}>{spellNameWord(named, language)}</Tooltip>
  );
}
