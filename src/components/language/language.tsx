import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { NewLanguage } from "../../language/names";
import { spellWord } from "../../language/lexicon/word";
import { Names } from "./names";

export function Language({
  newLanguage,
  inspect,
}: {
  newLanguage: NewLanguage;
} & InspectProps) {
  return (
    <>
      <InspectLink id={newLanguage.id} inspect={inspect} kind="language" />
      <Names named={newLanguage} />
      {[...newLanguage.registry.conceptLookup.entries()].map(([key, word]) => (
        <div key={key}>
          <b>{key}</b>: {spellWord(word)}
        </div>
      ))}
    </>
  );
}
