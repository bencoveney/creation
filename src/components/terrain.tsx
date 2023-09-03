import { useEffect, useRef } from "react";
import { Terrain as TerrainModel, getIndex } from "../terrain";
import { getMinAndMax } from "../utils/array";
import { Color, toHex } from "@bencoveney/utils/dist/color";
import { clamp, inverseLerp } from "../utils/maths";

export function Terrain({
  terrain,
  hoverX,
  hoverY,
}: {
  terrain: TerrainModel;
  hoverX: number | null;
  hoverY: number | null;
}) {
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

    const { min, max } = getMinAndMax(terrain.heights);

    const hoverIndex =
      hoverX !== null && hoverY !== null
        ? getIndex(hoverX, hoverY, terrain.width, terrain.height)
        : null;

    for (let x = 0; x < terrain.width; x++) {
      for (let y = 0; y < terrain.height; y++) {
        const index = getIndex(x, y, terrain.width, terrain.height);
        const height = index === hoverIndex ? 100 : terrain.heights[index];
        const colorComponent = clamp(
          Math.floor(inverseLerp(height, min, max) * 255),
          0,
          255
        );
        const color: Color = {
          r: colorComponent,
          g: colorComponent,
          b: colorComponent,
        };
        context.fillStyle = toHex(color);
        const flipY = terrain.height - y - 1;
        if (index === hoverIndex && height >= 100) {
          context.fillStyle = "#ff0000";
          context.fillRect(x, flipY, 1, 1);
        } else {
          context.fillRect(x, flipY, 1, 1);
        }
      }
    }
  }, [canvasRef.current, hoverX, hoverY]);
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
