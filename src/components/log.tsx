import { History } from "../state/history";
import { Language, getWords, spellWords } from "../state/language/language";
import { useInput } from "../hooks/useInput";
import { LogEntry } from "../log";
import { Fragment, useState } from "react";
import { FixedTop } from "./layout/fixedTop";
import { Button } from "./layout/button";
import { Toolbar } from "./layout/toolbar";
import { Table } from "./layout/table";
import { InspectProps } from "../hooks/useInspect";
import { InspectLink } from "./inspectLink";
import { spacer } from "./layout/theme";

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
  artifact,
  initialSystems,
  inspect,
}: {
  history: History;
  language: Language;
  being?: string;
  location?: string;
  artifact?: string;
  initialSystems?: string[];
} & InspectProps) {
  const [filter, input] = useInput("Filter");
  const [enabledSystems, setEnabledSystems] = useState(
    initialSystems || ["init", "decision"]
  );
  const selectedLogs = history.log.entries
    .map<LogEntry>(([tick, system, log, deities, locations, artifacts]) => [
      tick,
      system,
      formatLog(log, language),
      deities,
      locations,
      artifacts,
    ])
    .filter(([_t, system, log, beings, locations, artifacts]) => {
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
      if (artifact && !artifacts.includes(artifact)) {
        return false;
      }
      return true;
    });
  const limitedLogs = selectedLogs.slice(0, 200);
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
      <FixedTop>
        {limitedLogs.length !== selectedLogs.length ? (
          <div style={{ padding: spacer.medium, textAlign: "center" }}>
            Showing first {limitedLogs.length} of {selectedLogs.length}
          </div>
        ) : null}
        <Table cols={6}>
          <span>Year</span>
          <span>System</span>
          <span>Message</span>
          <span>Beings</span>
          <span>Locations</span>
          <span>Artifacts</span>
          {limitedLogs.map(
            ([tick, system, log, deities, locations, artifacts], index) => {
              return (
                <Fragment key={index}>
                  <div style={{ textAlign: "right" }}>{tick}</div>
                  <div>{system}</div>
                  <div>{log}</div>
                  <div
                    style={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: "min-content",
                      gridGap: spacer.small,
                    }}
                  >
                    {deities.map((id) => (
                      <InspectLink
                        key={id}
                        kind="being"
                        id={id}
                        inspect={inspect}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: "min-content",
                      gridGap: spacer.small,
                    }}
                  >
                    {locations.map((id) => (
                      <InspectLink
                        key={id}
                        kind="region"
                        id={id}
                        inspect={inspect}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: "min-content",
                      gridGap: spacer.small,
                    }}
                  >
                    {artifacts.map((id) => (
                      <InspectLink
                        key={id}
                        kind="artifact"
                        id={id}
                        inspect={inspect}
                      />
                    ))}
                  </div>
                </Fragment>
              );
            }
          )}
        </Table>
      </FixedTop>
    </FixedTop>
  );
}
