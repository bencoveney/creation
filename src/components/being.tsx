import { getFromLookup } from "../utils/lookup";
import { History, Being } from "../worldgen";
import { Language, getWord, spellWord } from "../worldgen/language";
import { Id } from "./layout/id";
import { Motif } from "./motif";
import { Name } from "./name";
import { Names } from "./names";
import { Tags, TagsItem } from "./layout/tags";
import { Needs } from "./needs";
import { CurrentActivity } from "./currentActivity";
import { Preferences } from "./preferences";
import { Holding } from "./holding";
import { InspectProps } from "../hooks/useInspect";

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
      <Tags>
        {Object.entries(being.relationships).map(
          ([otherBeing, relationship]) => {
            const otherBeingName = spellWord(
              getWord(getFromLookup(history.beings, otherBeing).name, language)
            );
            return (
              <TagsItem key={otherBeing}>
                <Name
                  key={otherBeingName}
                  languageName={languageName}
                  word={otherBeingName}
                />
                : {`${relationship.kind} ${relationship.encounters}`}
              </TagsItem>
            );
          }
        )}
      </Tags>
      <Needs needs={being.needs} />
      <Preferences preferences={being.preferences} />
      {being.currentActivity && (
        <CurrentActivity currentActivity={being.currentActivity} />
      )}
      <Holding artifacts={being.holding} inspect={inspect} />
    </>
  );
}
