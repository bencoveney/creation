import { History, Being } from "../history";
import { Language, getWord, spellWord } from "../language/language";
import { Id } from "./layout/id";
import { Motif } from "./motif";
import { Names } from "./names";
import { Needs } from "./needs";
import { CurrentActivity } from "./currentActivity";
import { Preferences } from "./preferences";
import { Holding } from "./holding";
import { InspectProps } from "../hooks/useInspect";
import { TimesChosen } from "./timesChosen";
import { Relationships } from "./relationships";

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
  const languageName = spellWord(getWord(language.name, language));
  return (
    <>
      <Id value={being.id} /> {being.name}:
      <Names name={being.name} history={history} />
      <Motif motif={being.motif} />
      {being.theme && `Deity of ${being.theme}`}
      <Needs needs={being.needs} />
      <Preferences preferences={being.preferences} />
      <TimesChosen timesChosen={being.timesChosen} />
      {being.currentActivity && (
        <CurrentActivity currentActivity={being.currentActivity} />
      )}
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
