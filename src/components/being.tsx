import { Being } from "../history";
import { Motif } from "./motif";
import { Needs } from "./needs";
import { Activities } from "./activities";
import { Preferences } from "./preferences";
import { InspectProps } from "../hooks/useInspect";
import { TimesChosen } from "./timesChosen";
import { Relationships } from "./relationships";
import { InspectLink } from "./inspectLink";
import { InspectLinks } from "./inspectLinks";
import { Names } from "./language/names";

export function Being({
  being,
  inspect,
}: {
  being: Being;
} & InspectProps) {
  return (
    <>
      <InspectLink id={being.id} inspect={inspect} kind="being" />
      <Names named={being} />
      <Motif motif={being.motif} />
      {being.theme && `Represents ${being.theme}`}
      <Needs needs={being.needs} />
      <Preferences preferences={being.preferences} />
      <TimesChosen timesChosen={being.timesChosen} />
      <Activities hasActivities={being} />
      <h3>Holding</h3>
      <InspectLinks ids={being.holding} kind="artifact" inspect={inspect} />
      <Relationships relationships={being.relationships} inspect={inspect} />
    </>
  );
}
