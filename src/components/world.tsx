import { useCallback, useState } from "react";
import { Map } from "./map/map";
import { WorldSelection } from "./worldSelection";
import { InspectProps } from "../hooks/useInspect";
import { useHistory } from "./historyContext";

export function World({ inspect }: {} & InspectProps) {
  const history = useHistory();
  if (!history.world) {
    return null;
  }

  const [terrainLayer, setTerrainLayer] = useState("colors");

  const [selection, setSelection] = useState([0, 0]);
  const [selectionX, selectionY] = selection;

  const setSelectionComparer = useCallback(
    (newSelection: [number, number]) => {
      if (
        selection[0] !== newSelection[0] ||
        selection[1] !== newSelection[1]
      ) {
        setSelection(newSelection);
      }
    },
    [selection]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Map terrainLayer={terrainLayer} setSelection={setSelectionComparer} />
      <div style={{ flexGrow: 1 }}>
        <WorldSelection
          selectionX={selectionX}
          selectionY={selectionY}
          setTerrainLayer={setTerrainLayer}
          terrainLayer={terrainLayer}
          inspect={inspect}
        />
      </div>
    </div>
  );
}
