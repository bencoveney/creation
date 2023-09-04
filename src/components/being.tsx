import { getFromLookup } from "../utils/lookup";
import { History, Being } from "../worldgen";
import { Language, getWord, spellWord } from "../worldgen/language";
import { Id } from "./id";
import { Motif } from "./motif";
import { Names } from "./names";

export function Being({
  being,
  history,
  language,
}: {
  being: Being;
  history: History;
  language: Language;
}) {
  return (
    <>
      <Id value={being.id} /> {being.name}:
      <Names name={being.name} history={history} />
      <Motif motif={being.motif} />
      {being.theme && `Deity of ${being.theme}`}
      {Object.entries(being.relationships).map(([otherBeing, relationship]) => {
        const otherBeingName = spellWord(
          getWord(getFromLookup(history.beings, otherBeing).name, language)
        );
        return (
          <p>
            {`${otherBeingName} ${relationship.kind} ${relationship.encounters}`}
          </p>
        );
      })}
    </>
  );
}

const buh = {
  "2": { kind: "acquaintance", encounters: 1 },
  "7": { kind: "acquaintance", encounters: 1 },
  "10": { kind: "acquaintance", encounters: 1 },
  "11": { kind: "acquaintance", encounters: 1 },
  "12": { kind: "acquaintance", encounters: 1 },
  "13": { kind: "acquaintance", encounters: 5 },
  "14": { kind: "acquaintance", encounters: 1 },
  "15": { kind: "acquaintance", encounters: 1 },
  "16": { kind: "acquaintance", encounters: 4 },
};
