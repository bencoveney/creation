import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { useInput } from "../hooks/useInput";
import { LogEntry } from "../log";
import { useState } from "react";
import { FixedTop } from "./layout/fixedTop";
import { Button } from "./layout/button";
import { Toolbar } from "./layout/toolbar";
import { Table } from "./layout/table";

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
  being,
  location,
}: {
  history: History;
  language: Language;
  being?: string;
  location?: string;
}) {
  const [filter, input] = useInput("Filter");
  const [enabledSystems, setEnabledSystems] = useState([
    "init",
    "symbolAdoption",
    "decision",
    "artifactCreation",
  ]);
  const selectedLogs = history.log.entries
    .map<LogEntry>(([tick, system, log, deities, locations]) => [
      tick,
      system,
      formatLog(log, language),
      deities,
      locations,
    ])
    .filter(([_t, system, log, beings, locations]) => {
      if (!enabledSystems.includes(system)) {
        return false;
      }
      if (filter && !log.includes(filter)) {
        return false;
      }
      if (being && !beings.includes(being)) {
        return false;
      }
      if (location && !locations.includes(location)) {
        return false;
      }
      return true;
    });
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
      <Table cols={5}>
        <span>Year</span>
        <span>System</span>
        <span>Message</span>
        <span>Beings</span>
        <span>Location</span>
        {selectedLogs.map(([tick, system, log, deities, locations]) => {
          return (
            <>
              <div style={{ textAlign: "right" }}>{tick}</div>
              <div>{system}</div>
              <div>{log}</div>
              <div>{deities.join(", ")}</div>
              <div>{locations.join(", ")}</div>
            </>
          );
        })}
      </Table>
    </FixedTop>
  );
}
