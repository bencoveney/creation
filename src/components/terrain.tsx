import { useEffect, useRef } from "react";
import { Terrain as TerrainModel, getIndex } from "../terrain";
import { getMax, getMin } from "../utils/array";
import { Color, toHex } from "@bencoveney/utils/dist/color";

export function Terrain({ terrain }: { terrain: TerrainModel }) {
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

    const minHeight = getMin(terrain.heights);
    const maxHeight = getMax(terrain.heights);

    for (let x = 0; x < terrain.width; x++) {
      for (let y = 0; y < terrain.height; y++) {
        const index = getIndex(x, y, terrain.width, terrain.height);
        const height = terrain.heights[index];
        const colorComponent = Math.floor(height * 10);
        const color: Color = {
          r: colorComponent,
          g: colorComponent,
          b: colorComponent,
        };
        context.fillStyle = toHex(color);
        context.fillRect(x, y, 1, 1);
      }
    }
  }, [canvasRef.current]);
  return (
    <canvas
      ref={canvasRef}
      width={terrain.width}
      height={terrain.height}
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
