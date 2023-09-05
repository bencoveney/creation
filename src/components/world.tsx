import { History } from "../worldgen";
import { Language } from "../worldgen/language";
import { useState } from "react";
import { Map } from "./map";
import { WorldSelection } from "./worldSelection";

export function World({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  if (!history.world) {
    return null;
  }

  const [terrainLayer, setTerrainLayer] = useState("colors");

  const [selection, setSelection] = useState([0, 0]);
  const [selectionX, selectionY] = selection;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Map
        history={history}
        language={language}
        terrainLayer={terrainLayer}
        setSelection={setSelection}
      />
      <div style={{ flexGrow: 1 }}>
        <WorldSelection
          history={history}
          language={language}
          selectionX={selectionX}
          selectionY={selectionY}
          setTerrainLayer={setTerrainLayer}
        />
      </div>
    </div>
  );
}
