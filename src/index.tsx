import { createRoot } from "react-dom/client";
import { initHistory, tick } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import { getWord } from "./worldgen/language";
import { Page } from "./components/page";
import { runMovementSystem } from "./worldgen/systems/movement";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

const history = initHistory();
populateWorld(history);
for (let i = 0; i < 75; i++) {
  tick(history);
  runMovementSystem(history);
  // Gods can create demigods
  // Gods can create species
}
const { language } = [...history.dialects.map.values()][0];

["the", "of"].map((word) => getWord(word, language, 1));

createRoot(root).render(<Page history={history} language={language}></Page>);
