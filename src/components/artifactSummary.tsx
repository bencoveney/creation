import { Artifact } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { Names } from "./language/names";

export function ArtifactSummary({
  artifact,
  inspect,
}: {
  artifact: Artifact;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="artifact" id={artifact.id} inspect={inspect} />
      <Names named={artifact} />
      {artifact.object}
    </>
  );
}
