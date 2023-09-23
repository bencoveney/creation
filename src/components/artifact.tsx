import { History, Artifact } from "../history";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { InspectLinks } from "./inspectLinks";
import { Names } from "./names";

export function Artifact({
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
      <h3>Holder</h3>
      <InspectLink kind="being" id={artifact.inPosessionOf} inspect={inspect} />
      <h3>Creators</h3>
      <InspectLinks kind="being" ids={artifact.creators} inspect={inspect} />
    </>
  );
}
