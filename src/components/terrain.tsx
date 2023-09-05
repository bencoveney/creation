import { useEffect, useRef } from "react";
import { Color, toHex } from "@bencoveney/utils/dist/color";
import {
  Array2d,
  array2dFlipY,
  array2dGetIndex,
  array2dMap,
} from "../utils/array2d";
import { TerrainRegistry, getTerrainLayer } from "../terrain/registry";
import { getNumberColor, getStringColor } from "../terrain/color";

export function Terrain({
  terrain,
  layerName,
  hoverX,
  hoverY,
}: {
  terrain: TerrainRegistry;
  layerName: string;
  hoverX: number | null;
  hoverY: number | null;
}) {
  const layer = getTerrainLayer(terrain, layerName);

  let colors: Array2d<Color>;
  switch (layer.kind) {
    case "color":
      colors = layer.values;
      break;
    case "number":
      colors = array2dMap(layer.values, getNumberColor);
      break;
    case "string":
      colors = array2dMap(layer.values, (value) =>
        getStringColor(value, layer.colorMap)
      );
      break;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const hoverIndex =
      hoverX !== null && hoverY !== null
        ? array2dGetIndex(colors, hoverX, hoverY)
        : null;

    array2dMap(colors, (color, x, y, index) => {
      const flipY = array2dFlipY(colors, y);
      if (index === hoverIndex) {
        context.fillStyle = "#ff0000";
        context.fillRect(x, flipY, 1, 1);
      } else {
        context.fillStyle = toHex(color);
        context.fillRect(x, flipY, 1, 1);
      }
    });
  }, [canvasRef.current, hoverX, hoverY, colors]);
  return (
    <canvas
      ref={canvasRef}
      width={colors.xSize}
      height={colors.ySize}
      style={{
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        margin: 0,
        padding: 0,
      }}
    />
  );
}
