import { spellNameWord } from "../../language";
import { HasNames } from "../../language/names";
import { spacer } from "../layout/theme";
import { Tooltip } from "../layout/tooltip";
import { useLanguage } from "./languageContext";

export function Names({ named }: { named: HasNames }) {
  const language = useLanguage();
  const languageName = spellNameWord(language, language);
  return (
    <div
      style={{
        backgroundColor: "#e4e3cd",
        borderColor: "#d6d5b7",
        borderWidth: 1,
        borderStyle: "solid",
        padding: spacer.small,
        marginTop: spacer.small,
        marginBottom: spacer.small,
      }}
    >
      <Tooltip label={languageName}>{spellNameWord(named, language)}</Tooltip>
      <span style={{ color: "grey", fontFamily: "monospace" }}>
        (<Tooltip label="Untranslated">{named.names.defaultKey}</Tooltip>)
      </span>
    </div>
  );
}
