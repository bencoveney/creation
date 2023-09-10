import { InspectProps, Inspected } from "../hooks/useInspect";
import { getFromLookup } from "../utils/lookup";
import { Being, History, Region } from "../worldgen";
import { Language } from "../worldgen/language";
import { Being as BeingComponent } from "./being";
import { VerticalSplit } from "./layout/verticalSplit";
import { Log } from "./log";
import { Region as RegionComponent } from "./region";

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
      <BeingComponent history={history} language={language} being={being} />
      <Log
        history={history}
        language={language}
        being={being.id}
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
        inspect={inspect}
      />
    </VerticalSplit>
  );
}
