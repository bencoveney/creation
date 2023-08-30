import { createRoot } from "react-dom/client";
import { initHistory } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import { getWord } from "./worldgen/language";
import { Page } from "./components/page";
import { runMovementSystem } from "./systems/movement";
import { runArtifactCreationSystem } from "./systems/artifactCreation";
import { runDeityCreation } from "./systems/deityCreation";
import { runSymbolAdoption } from "./systems/symbolAdoption";
import { runWorldFormation } from "./systems/worldFormation";
import { createPlaybackControls } from "./playback";
import { useMemo, useState } from "react";
import { Playback } from "./components/playback";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

function initialiseHistory() {
  const newHistory = initHistory();
  populateWorld(newHistory);
  const { language } = [...newHistory.dialects.map.values()][0];
  newHistory.config.preRegisterWords.map((word) => getWord(word, language, 1));
  return newHistory;
}

function Wrapper() {
  const [history, setHistory] = useState(initialiseHistory());
  const [, updateState] = useState({});

  const playbackControls = useMemo(
    () =>
      createPlaybackControls(
        (_tick) => {
          setHistory(initialiseHistory());
        },
        (tick) => {
          history.tick = tick;
          history.log.tick = tick;
          runMovementSystem(history);
          runArtifactCreationSystem(history);
          runDeityCreation(history);
          runSymbolAdoption(history);
          runWorldFormation(history);
          updateState({});
          return tick < history.config.runTicks;
        }
      ),
    [history]
  );

  const firstDialect = [...history.dialects.map.values()][0];

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

// To Do:
// World restart doesn't work because systems are stateful
// Gods can create demigods
// Gods can create species
