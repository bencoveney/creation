import { Relationships } from "../history";
import { Name } from "./language/name";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { spacer } from "./layout/theme";
import { useLanguage } from "./language/languageContext";
import { useHistory } from "./historyContext";
import { getFromLookup } from "../history/lookup";

export function Relationships({
  relationships,
  inspect,
}: {
  relationships: Relationships;
} & InspectProps) {
  if (Object.entries(relationships).length === 0) {
    return null;
  }
  const language = useLanguage();
  const history = useHistory();
  return (
    <>
      <h3>Relationships</h3>
      {Object.entries(relationships).map(([otherBeingId, relationship]) => {
        const otherBeing = getFromLookup(history.beings, otherBeingId);
        return (
          <div
            key={otherBeingId}
            style={{ textAlign: "center", marginBottom: spacer.medium }}
          >
            <div>
              <Name language={language} named={otherBeing} /> -{" "}
              {`${relationship.kind} ${relationship.encounters}`}
            </div>
            <InspectLink id={otherBeingId} inspect={inspect} kind="being" />
          </div>
        );
      })}
    </>
  );
}
