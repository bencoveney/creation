import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";

export function Holding({
  artifacts,
  inspect,
}: { artifacts: string[] } & InspectProps) {
  return artifacts.map((id) => (
    <InspectLink key={id} id={id} kind="artifact" inspect={inspect} />
  ));
}
