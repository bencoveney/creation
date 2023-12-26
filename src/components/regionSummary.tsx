import { Region } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { Names } from "./language/names";

export function RegionSummary({
  region,
  inspect,
}: {
  region: Region;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="region" id={region.id} inspect={inspect} />
      <Names named={region} />
    </>
  );
}
