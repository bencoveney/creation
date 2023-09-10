import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { useInput } from "../hooks/useInput";
import { LogEntry } from "../log";
import { useState } from "react";
import { FixedTop } from "./layout/fixedTop";
import { Button } from "./layout/button";
import { Toolbar } from "./layout/toolbar";

const logReplaceRegex = /\[\[([^\[\]]+)\]\]/g;
function formatLog(message: string, language: Language): string {
  return message.replace(
    logReplaceRegex,
    (_, word) => `${spellWords(getWords(word, language))}`
  );
}

export function Log({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  const [filter, input] = useInput("Filter");
  const [enabledSystems, setEnabledSystems] = useState([
    "init",
    "symbolAdoption",
    "decision",
    "artifactCreation",
  ]);
  return (
    <FixedTop>
      <Toolbar>
        {input}
        {[...history.log.knownSystems.values()].map((system) => (
          <Button
            key={system}
            onClick={() => {
              const newEnabledSystems = enabledSystems.includes(system)
                ? enabledSystems.filter((sys) => sys !== system)
                : enabledSystems.concat(system);
              setEnabledSystems(newEnabledSystems);
            }}
          >
            {enabledSystems.includes(system) ? "🟩" : "🟥"}
            {system}
          </Button>
        ))}
      </Toolbar>
      <ul>
        {history.log.entries
          .map<LogEntry>(([tick, system, ...log]) => [
            tick,
            system,
            formatLog(log.join(","), language),
          ])
          .filter(([_t, system]) => enabledSystems.includes(system))
          .filter(([_t, _s, log]) => log.includes(filter))
          .map(([tick, system, ...log], index) => {
            return (
              <li key={index}>
                {tick} {system} {formatLog(log.join(","), language)}
              </li>
            );
          })}
      </ul>
    </FixedTop>
  );
}
