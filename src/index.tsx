import { createRoot } from "react-dom/client";
import { initHistory } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import { Page } from "./components/page";
import { runMovement } from "./systems/movement";
import { runArtifactCreation } from "./systems/artifactCreation";
import { runSymbolAdoption } from "./systems/symbolAdoption";
import { runWorldFormation } from "./systems/worldFormation";
import { createPlaybackControls } from "./playback";
import { useEffect, useMemo, useState } from "react";
import { Playback } from "./components/playback";
import { runDecision } from "./systems/decision";
import { getQueryBool } from "./utils/queryParams";
import { lookupFirstValue } from "./utils/lookup";
import { config } from "./config";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

function initialiseHistory() {
  const newHistory = initHistory();
  populateWorld(newHistory);
  return newHistory;
}

function Wrapper() {
  const [history, setHistory] = useState(initialiseHistory());
  const [, forceRerender] = useState({});

  const playbackControls = useMemo(
    () =>
      createPlaybackControls(
        (_tick) => {
          setHistory(initialiseHistory());
        },
        (tick) => {
          history.tick = tick;
          history.log.tick = tick;
          history.log.currentSystem = "movement";
          runMovement(history);
          history.log.currentSystem = "artifactCreation";
          runArtifactCreation(history);
          history.log.currentSystem = "symbolAdoption";
          runSymbolAdoption(history);
          history.log.currentSystem = "worldFormation";
          runWorldFormation(history);
          history.log.currentSystem = "decision";
          runDecision(history);
          forceRerender({});
          return tick < config.runTicks;
        }
      ),
    [history]
  );

  useEffect(() => {
    if (getQueryBool("autorun")) {
      playbackControls.tickAll();
      console.log(history);
    }
  }, [playbackControls, history]);

  const firstDialect = lookupFirstValue(history.dialects);

  return firstDialect ? (
    <Page
      history={history}
      language={firstDialect.language}
      playbackControls={playbackControls}
    />
  ) : (
    <Playback {...playbackControls} />
  );
}

createRoot(root).render(<Wrapper />);
