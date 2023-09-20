import { createRoot } from "react-dom/client";
import { Page } from "./components/page";
import { runMovement } from "./systems/movement";
import { runArtifactCreation } from "./systems/artifactCreation";
import { runSymbolAdoption } from "./systems/symbolAdoption";
import { createPlaybackControls } from "./playback";
import { useEffect, useMemo, useState } from "react";
import { runDecision } from "./systems/decision";
import { getQueryBool } from "./utils/queryParams";
import { config } from "./config";
import { runConversation } from "./systems/conversation";
import { runNeeds } from "./systems/needs";
import { runArtifactGiving } from "./systems/artifactGiving";
import { initialiseHistory } from "./history/factories";
import { lookupFirstValue } from "./history/lookup";
import { runRest } from "./systems/rest";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

const history = initialiseHistory();

function Wrapper() {
  const [, forceRerender] = useState({});

  const playbackControls = useMemo(
    () =>
      createPlaybackControls((tick) => {
        history.tick = tick;
        history.log.tick = tick;
        // Order is roughly:
        // - Make a decision
        // - Act on it
        //   - Do systems first that are least likely to invalidate others.
        history.log.currentSystem = "decision";
        runDecision(history);
        history.log.currentSystem = "needs";
        runNeeds(history);
        history.log.currentSystem = "conversation";
        runConversation(history);
        history.log.currentSystem = "artifactCreation";
        runArtifactCreation(history);
        history.log.currentSystem = "artifactGiving";
        runArtifactGiving(history);
        history.log.currentSystem = "symbolAdoption";
        runSymbolAdoption(history);
        history.log.currentSystem = "rest";
        runRest(history);
        history.log.currentSystem = "movement";
        runMovement(history);
        forceRerender({});
        return tick < config.runTicks;
      }),
    []
  );

  useEffect(() => {
    if (playbackControls.canTick && getQueryBool("autorun")) {
      playbackControls.tickAll();
      console.log(history);
    }
  }, [playbackControls]);

  return (
    <Page
      history={history}
      language={lookupFirstValue(history.dialects).language}
      playbackControls={playbackControls}
    />
  );
}

createRoot(root).render(<Wrapper />);
