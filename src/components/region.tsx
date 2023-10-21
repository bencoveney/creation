import { Region } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";

export function Region({
  region,
  inspect,
}: {
  region: Region;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="region" id={region.id} inspect={inspect} />
      <div>{region.names.defaultKey}</div>
    </>
  );
}
