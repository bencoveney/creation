import { History } from "../worldgen";
import { Language } from "../worldgen/language";
import { Terrain } from "./terrain";
import { useHoverPosition } from "../hooks/useHover";
import {
  TerrainRegistryNumberEntry,
  getTerrainLayer,
} from "../terrain/registry";
import { MapTile } from "./mapTile";
import { useEffect } from "react";
import { getTile } from "../worldgen/world";
import { clamp } from "../utils/maths";

export function Map({
  history,
  language,
  terrainLayer,
  setSelection,
}: {
  history: History;
  language: Language;
  terrainLayer: string;
  setSelection: (coords: [number, number]) => void;
}) {
  if (!history.world) {
    return null;
  }
  const { terrainRegistry } = history;
  const { values: heights } = getTerrainLayer(
    terrainRegistry,
    "heights"
  ) as TerrainRegistryNumberEntry;
  const renderWidth = 900;
  const renderHeight = 900;
  const [handler, x, y] = useHoverPosition();
  const pixelX =
    x === null
      ? 0
      : clamp(
          0,
          heights.xSize,
          Math.floor(
            Math.min(x, renderWidth - 1) / (renderWidth / heights.xSize)
          )
        );
  const pixelY =
    y === null
      ? null
      : clamp(
          0,
          heights.ySize,
          Math.floor(
            Math.min(y, renderHeight - 1) / (renderHeight / heights.ySize)
          )
        );
  const flipPixelY = pixelY === null ? 0 : heights.ySize - pixelY - 1;
  const selectedTile =
    pixelX !== null &&
    flipPixelY !== null &&
    getTile(history.world, pixelX, flipPixelY);
  useEffect(() => {
    if (pixelX !== null && flipPixelY !== null) {
      setSelection([pixelX, flipPixelY]);
    }
  }, [setSelection, pixelX, flipPixelY]);
  const layer = getTerrainLayer(terrainRegistry, terrainLayer);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${renderWidth / history.world?.xSize!}px `.repeat(
          history.world?.xSize!
        ),
        gridTemplateRows: `${renderHeight / history.world?.ySize!}px `.repeat(
          history.world?.ySize!
        ),
        maxHeight: renderHeight,
        maxWidth: renderWidth,
        height: renderHeight,
        width: renderWidth,
      }}
      onMouseMove={handler}
    >
      {selectedTile && (
        <div
          style={{
            gridRow: history.world.ySize - selectedTile.y,
            gridColumn: selectedTile.x + 1,
            aspectRatio: 1,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <MapTile tile={selectedTile} history={history} language={language} />
        </div>
      )}
      <div
        style={{
          gridRowStart: 1,
          gridRowEnd: -1,
          gridColumnStart: 1,
          gridColumnEnd: -1,
          aspectRatio: 1,
          zIndex: 0,
        }}
      >
        <Terrain layer={layer} hoverX={pixelX} hoverY={flipPixelY} />
      </div>
    </div>
  );
}
