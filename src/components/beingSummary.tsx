import { Being } from "../history";
import { Motif } from "./motif";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { Names } from "./language/names";

export function BeingSummary({
  being,
  inspect,
}: {
  being: Being;
} & InspectProps) {
  return (
    <>
      <InspectLink id={being.id} inspect={inspect} kind="being" />
      <Names named={being} />
      <div>{being.role}</div>
      <Motif motif={being.motif} />
      {being.theme && `Represents ${being.theme}`}
    </>
  );
}
