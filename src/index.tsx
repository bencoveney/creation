import { createRoot } from "react-dom/client";
import { initHistory } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import { getWord } from "./worldgen/language";
import { Page } from "./components/page";
import { runMovementSystem } from "./worldgen/systems/movement";
import { runArtifactCreationSystem } from "./worldgen/systems/artifactCreation";
import { runDeityCreation } from "./worldgen/systems/deityCreation";
import { runSymbolAdoption } from "./worldgen/systems/symbolAdoption";
import { runWorldFormation } from "./worldgen/systems/worldFormation";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

const history = initHistory();
populateWorld(history);
for (let i = 0; i < history.config.runTicks; i++) {
  history.log.tick = history.tick++;
  runMovementSystem(history);
  runArtifactCreationSystem(history);
  runDeityCreation(history);
  runSymbolAdoption(history);
  runWorldFormation(history);
}
const { language } = [...history.dialects.map.values()][0];

history.config.preRegisterWords.map((word) => getWord(word, language, 1));

createRoot(root).render(<Page history={history} language={language}></Page>);

// To Do:
// Gods can create demigods
// Gods can create species
