import { History, Relationships } from "../history";
import { Name } from "./name";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { spacer } from "./layout/theme";

export function Relationships({
  relationships,
  inspect,
}: {
  relationships: Relationships;
} & InspectProps) {
  if (Object.entries(relationships).length === 0) {
    return null;
  }
  return (
    <>
      <h3>Relationships</h3>
      {Object.entries(relationships).map(([otherBeing, relationship]) => {
        const otherBeingName = otherBeing;
        return (
          <div
            key={otherBeing}
            style={{ textAlign: "center", marginBottom: spacer.medium }}
          >
            <div>
              <Name
                key={otherBeingName}
                languageName={"ID"}
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
