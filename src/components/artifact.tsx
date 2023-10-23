import { ArtifactPart } from "../artifact/config";
import { getArtifactDescriptionLong } from "../artifact/factory";
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
      <div>{getArtifactDescriptionLong(artifact)}</div>
      <div>
        <ArtifactParts parts={artifact.parts} />
      </div>
      <h3>Holder</h3>
      <InspectLink kind="being" id={artifact.inPosessionOf} inspect={inspect} />
      <h3>Creators</h3>
      <InspectLinks kind="being" ids={artifact.creators} inspect={inspect} />
    </>
  );
}

function ArtifactParts({ parts }: { parts: ArtifactPart[] }) {
  if (parts.length === 0) {
    return;
  }
  return (
    <ul>
      {parts.map((part) => (
        <li key={part.name}>
          {part.name} ({part.material})
          {part.parts.length > 0 ? <ArtifactParts parts={part.parts} /> : null}
        </li>
      ))}
    </ul>
  );
}
