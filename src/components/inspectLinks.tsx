import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { spacer } from "./layout/theme";

export function InspectLinks({
  ids,
  kind,
  inspect,
}: {
  ids: string[];
  kind: "being" | "region" | "artifact";
} & InspectProps) {
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "min-content",
        gridGap: spacer.small,
      }}
    >
      {ids.map((id) => (
        <InspectLink key={id} kind={kind} id={id} inspect={inspect} />
      ))}
    </div>
  );
}
