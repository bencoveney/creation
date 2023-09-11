import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";

export function Holding({
  artifacts,
  inspect,
}: { artifacts: string[] } & InspectProps) {
  if (artifacts.length === 0) {
    return null;
  }
  return (
    <>
      <h3>Holding</h3>
      {artifacts.map((id) => (
        <InspectLink key={id} id={id} kind="artifact" inspect={inspect} />
      ))}
    </>
  );
}
