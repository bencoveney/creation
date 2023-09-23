import { History, Being } from "../history";
import { Language } from "../language/language";
import { Motif } from "./motif";
import { Names } from "./names";
import { Needs } from "./needs";
import { Activities } from "./activities";
import { Preferences } from "./preferences";
import { Holding } from "./holding";
import { InspectProps } from "../hooks/useInspect";
import { TimesChosen } from "./timesChosen";
import { Relationships } from "./relationships";
import { InspectLink } from "./inspectLink";

export function Being({
  being,
  history,
  language,
  inspect,
}: {
  being: Being;
  history: History;
  language: Language;
} & InspectProps) {
  return (
    <>
      <InspectLink id={being.id} inspect={inspect} kind="being" />
      <div>{being.name}</div>
      <Names name={being.name} history={history} />
      <Motif motif={being.motif} />
      {being.theme && `Represents ${being.theme}`}
      <Needs needs={being.needs} />
      <Preferences preferences={being.preferences} />
      <TimesChosen timesChosen={being.timesChosen} />
      <Activities hasActivities={being} />
      <Holding artifacts={being.holding} inspect={inspect} />
      <Relationships
        relationships={being.relationships}
        history={history}
        language={language}
        inspect={inspect}
      />
    </>
  );
}
