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
  inspectBeing,
  inspectRegion,
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
          inspectBeing={inspectBeing}
          inspectRegion={inspectRegion}
        />
      );
    case "region":
      const region = getFromLookup(history.regions, inspected.id);
      return (
        <InspectRegion
          history={history}
          language={language}
          region={region}
          inspectBeing={inspectBeing}
          inspectRegion={inspectRegion}
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
  inspectBeing,
  inspectRegion,
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
        inspectBeing={inspectBeing}
        inspectRegion={inspectRegion}
      />
    </VerticalSplit>
  );
}

function InspectRegion({
  history,
  language,
  region,
  inspectBeing,
  inspectRegion,
}: {
  history: History;
  language: Language;
  region: Region;
} & InspectProps) {
  return <RegionComponent history={history} region={region} />;
}
