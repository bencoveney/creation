import { useInput } from "../hooks/useInput";
import { LogEntry } from "../log";
import { Fragment, useState } from "react";
import { FixedTop } from "./layout/fixedTop";
import { Button } from "./layout/button";
import { Toolbar } from "./layout/toolbar";
import { Table } from "./layout/table";
import { InspectProps } from "../hooks/useInspect";
import { spacer } from "./layout/theme";
import { InspectLinks } from "./inspectLinks";
import { useLanguage } from "./language/languageContext";
import { Language, spellNameWordByKey } from "../language";
import { useHistory } from "./historyContext";

const logReplaceRegex = /\[\[([^\[\]]+)\]\]/g;
function formatLog(message: string, language: Language): string {
  return message.replace(logReplaceRegex, (_, word) =>
    spellNameWordByKey(word, language)
  );
}

export function Log({
  being,
  location,
  artifact,
  initialSystems,
  inspect,
}: {
  being?: string;
  location?: string;
  artifact?: string;
  initialSystems?: string[];
} & InspectProps) {
  const [filter, input] = useInput("Filter");
  const [enabledSystems, setEnabledSystems] = useState(
    initialSystems || ["init", "decision"]
  );
  const language = useLanguage();
  const history = useHistory();
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
                  <InspectLinks kind="being" ids={deities} inspect={inspect} />
                  <InspectLinks
                    kind="region"
                    ids={locations}
                    inspect={inspect}
                  />
                  <InspectLinks
                    kind="artifact"
                    ids={artifacts}
                    inspect={inspect}
                  />
                </Fragment>
              );
            }
          )}
        </Table>
      </FixedTop>
    </FixedTop>
  );
}
