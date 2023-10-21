import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { Language } from "../../language";
import { spellWord } from "../../language/lexicon/word";
import { Names } from "./names";

export function Language({
  language,
  inspect,
}: {
  language: Language;
} & InspectProps) {
  return (
    <>
      <InspectLink id={language.id} inspect={inspect} kind="language" />
      <Names named={language} />
      {[...language.registry.conceptLookup.entries()].map(([key, word]) => (
        <div key={key}>
          <b>{key}</b>: {spellWord(word)}
        </div>
      ))}
    </>
  );
}
