import { InspectProps, Inspected } from "../hooks/useInspect";
import { getFromLookup } from "../utils/lookup";
import { Artifact, Being, History, Region } from "../worldgen";
import { Language } from "../worldgen/language";
import { Being as BeingComponent } from "./being";
import { VerticalSplit } from "./layout/verticalSplit";
import { Log } from "./log";
import { Region as RegionComponent } from "./region";
import { Artifact as ArtifactComponent } from "./artifact";

export function Inspect({
  history,
  language,
  inspected,
  inspect,
}: {
  history: History;
  language: Language;
  inspected: Inspected;
} & InspectProps) {
  switch (inspected.kind) {
    case "being":
      const being = getFromLookup(history.beings, inspected.id);
      return (
        <InspectBeing
          history={history}
          language={language}
          being={being}
          inspect={inspect}
        />
      );
    case "region":
      const region = getFromLookup(history.regions, inspected.id);
      return (
        <InspectRegion
          history={history}
          language={language}
          region={region}
          inspect={inspect}
        />
      );
    case "artifact":
      const artifact = getFromLookup(history.artifacts, inspected.id);
      return (
        <InspectArtifact
          history={history}
          language={language}
          artifact={artifact}
          inspect={inspect}
        />
      );
    default:
      return null;
  }
}

function InspectBeing({
  history,
  language,
  being,
  inspect,
}: {
  history: History;
  language: Language;
  being: Being;
} & InspectProps) {
  return (
    <VerticalSplit>
      <BeingComponent
        history={history}
        language={language}
        being={being}
        inspect={inspect}
      />
      <Log
        history={history}
        language={language}
        being={being.id}
        initialSystems={["decision"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectRegion({
  history,
  language,
  region,
  inspect,
}: {
  history: History;
  language: Language;
  region: Region;
} & InspectProps) {
  return (
    <VerticalSplit>
      <RegionComponent history={history} region={region} />
      <Log
        history={history}
        language={language}
        location={region.id}
        initialSystems={["movement", "artifactCreation"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}

function InspectArtifact({
  history,
  language,
  artifact,
  inspect,
}: {
  history: History;
  language: Language;
  artifact: Artifact;
} & InspectProps) {
  return (
    <VerticalSplit>
      <ArtifactComponent history={history} artifact={artifact} />
      <Log
        history={history}
        language={language}
        artifact={artifact.id}
        initialSystems={["artifactCreation", "artifactGiving"]}
        inspect={inspect}
      />
    </VerticalSplit>
  );
}
