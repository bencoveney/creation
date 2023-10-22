import { InspectProps, Inspected } from "../hooks/useInspect";
import { getFromLookup } from "../history/lookup";
import { Artifact, Being, Region } from "../history";
import { Being as BeingComponent } from "./being";
import { VerticalSplit } from "./layout/verticalSplit";
import { Log } from "./log";
import { Region as RegionComponent } from "./region";
import { Artifact as ArtifactComponent } from "./artifact";
import { Language as LanguageComponent } from "./language/language";
import { Language } from "../language";
import { useHistory } from "./historyContext";

export function Inspect({
  inspected,
  inspect,
}: {
  inspected: Inspected;
} & InspectProps) {
  const history = useHistory();
  switch (inspected.kind) {
    case "being":
      const being = getFromLookup(history.beings, inspected.id);
      return <InspectBeing being={being} inspect={inspect} />;
    case "region":
      const region = getFromLookup(history.regions, inspected.id);
      return <InspectRegion region={region} inspect={inspect} />;
    case "artifact":
      const artifact = getFromLookup(history.artifacts, inspected.id);
      return <InspectArtifact artifact={artifact} inspect={inspect} />;
    case "language":
      const language = getFromLookup(history.languages, inspected.id);
      return <InspectLanguage language={language} inspect={inspect} />;
    default:
      return null;
  }
}

function InspectBeing({
  being,
  inspect,
}: {
  being: Being;
} & InspectProps) {
  return (
    <VerticalSplit>
      <BeingComponent being={being} inspect={inspect} />
      <Log being={being.id} initialSystems={["decision"]} inspect={inspect} />
    </VerticalSplit>
  );
}

function InspectRegion({
  region,
  inspect,
}: {
  region: Region;
} & InspectProps) {
  return (
    <VerticalSplit>
      <RegionComponent region={region} inspect={inspect} />
      <Log
        location={region.id}
        initialSystems={["movement", "artifactCreation"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectArtifact({
  artifact,
  inspect,
}: {
  artifact: Artifact;
} & InspectProps) {
  return (
    <VerticalSplit>
      <ArtifactComponent artifact={artifact} inspect={inspect} />
      <Log
        artifact={artifact.id}
        initialSystems={["artifactCreation", "artifactGiving"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectLanguage({
  language,
  inspect,
}: {
  language: Language;
} & InspectProps) {
  return <LanguageComponent language={language} inspect={inspect} />;
}
