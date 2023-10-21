import { Artifact } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";

export function ArtifactSummary({
  artifact,
  inspect,
}: {
  artifact: Artifact;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="artifact" id={artifact.id} inspect={inspect} />
      <div>{artifact.names.defaultKey}</div>
      {artifact.object}
    </>
  );
}
