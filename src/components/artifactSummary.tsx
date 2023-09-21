import { History, Artifact } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { Names } from "./names";

export function ArtifactSummary({
  artifact,
  history,
  inspect,
}: {
  artifact: Artifact;
  history: History;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="artifact" id={artifact.id} inspect={inspect} />
      <div>{artifact.name}</div>
      <Names name={artifact.name} history={history} />
      {artifact.object}
    </>
  );
}
