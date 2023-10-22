import { Artifact } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { InspectLinks } from "./inspectLinks";
import { Names } from "./language/names";

export function Artifact({
  artifact,
  inspect,
}: {
  artifact: Artifact;
} & InspectProps) {
  return (
    <>
      <InspectLink kind="artifact" id={artifact.id} inspect={inspect} />
      <Names named={artifact} />
      <div>
        {artifact.material} {artifact.object}
      </div>
      <h3>Holder</h3>
      <InspectLink kind="being" id={artifact.inPosessionOf} inspect={inspect} />
      <h3>Creators</h3>
      <InspectLinks kind="being" ids={artifact.creators} inspect={inspect} />
    </>
  );
}
