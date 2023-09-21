import { History, Region } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { Names } from "./names";

export function RegionSummary({
  region,
  history,
  inspect,
}: {
  region: Region;
  history: History;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="region" id={region.id} inspect={inspect} />
      <div>{region.name}</div>
      <Names name={region.name} history={history} />
    </>
  );
}
