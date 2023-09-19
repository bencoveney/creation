import { getFromLookup } from "../history/lookup";
import { History, Relationships } from "../history";
import { Language, getWord, spellWord } from "../language/language";
import { Name } from "./name";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { spacer } from "./layout/theme";

export function Relationships({
  relationships,
  history,
  language,
  inspect,
}: {
  relationships: Relationships;
  history: History;
  language: Language;
} & InspectProps) {
  if (Object.entries(relationships).length === 0) {
    return null;
  }
  const languageName = spellWord(getWord(language.name, language));
  return (
    <>
      <h3>Relationships</h3>
      {Object.entries(relationships).map(([otherBeing, relationship]) => {
        const otherBeingName = spellWord(
          getWord(getFromLookup(history.beings, otherBeing).name, language)
        );
        return (
          <div
            key={otherBeing}
            style={{ textAlign: "center", marginBottom: spacer.medium }}
          >
            <div>
              <Name
                key={otherBeingName}
                languageName={languageName}
                word={otherBeingName}
              />{" "}
              - {`${relationship.kind} ${relationship.encounters}`}
            </div>
            <InspectLink id={otherBeing} inspect={inspect} kind="being" />
          </div>
        );
      })}
    </>
  );
}
