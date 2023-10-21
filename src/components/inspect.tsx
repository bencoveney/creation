import { InspectProps, Inspected } from "../hooks/useInspect";
import { getFromLookup } from "../history/lookup";
import { Artifact, Being, History, Region } from "../history";
import { Being as BeingComponent } from "./being";
import { VerticalSplit } from "./layout/verticalSplit";
import { Log } from "./log";
import { Region as RegionComponent } from "./region";
import { Artifact as ArtifactComponent } from "./artifact";
import { Language as LanguageComponent } from "./language/language";
import { NewLanguage } from "../language/names";

export function Inspect({
  history,
  inspected,
  inspect,
}: {
  history: History;
  inspected: Inspected;
} & InspectProps) {
  switch (inspected.kind) {
    case "being":
      const being = getFromLookup(history.beings, inspected.id);
      return <InspectBeing history={history} being={being} inspect={inspect} />;
    case "region":
      const region = getFromLookup(history.regions, inspected.id);
      return (
        <InspectRegion history={history} region={region} inspect={inspect} />
      );
    case "artifact":
      const artifact = getFromLookup(history.artifacts, inspected.id);
      return (
        <InspectArtifact
          history={history}
          artifact={artifact}
          inspect={inspect}
        />
      );
    case "language":
      const newLanguage = getFromLookup(history.languages, inspected.id);
      return <InspectLanguage newLanguage={newLanguage} inspect={inspect} />;
    default:
      return null;
  }
}

function InspectBeing({
  history,
  being,
  inspect,
}: {
  history: History;
  being: Being;
} & InspectProps) {
  return (
    <VerticalSplit>
      <BeingComponent being={being} inspect={inspect} />
      <Log
        history={history}
        being={being.id}
        initialSystems={["decision"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectRegion({
  history,
  region,
  inspect,
}: {
  history: History;
  region: Region;
} & InspectProps) {
  return (
    <VerticalSplit>
      <RegionComponent region={region} inspect={inspect} />
      <Log
        history={history}
        location={region.id}
        initialSystems={["movement", "artifactCreation"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectArtifact({
  history,
  artifact,
  inspect,
}: {
  history: History;
  artifact: Artifact;
} & InspectProps) {
  return (
    <VerticalSplit>
      <ArtifactComponent artifact={artifact} inspect={inspect} />
      <Log
        history={history}
        artifact={artifact.id}
        initialSystems={["artifactCreation", "artifactGiving"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectLanguage({
  newLanguage,
  inspect,
}: {
  newLanguage: NewLanguage;
} & InspectProps) {
  return <LanguageComponent newLanguage={newLanguage} inspect={inspect} />;
}
