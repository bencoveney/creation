import { History, Being } from "../history";
import { Motif } from "./motif";
import { Names } from "./names";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";

export function BeingSummary({
  being,
  history,
  inspect,
}: {
  being: Being;
  history: History;
} & InspectProps) {
  return (
    <>
      <InspectLink id={being.id} inspect={inspect} kind="being" />
      <div>{being.name}</div>
      <Names name={being.name} history={history} />
      <Motif motif={being.motif} />
      {being.theme && `Represents ${being.theme}`}
    </>
  );
}
