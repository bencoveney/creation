import { useEffect, useRef } from "react";
import { Terrain as TerrainModel } from "../terrain";
import { normalize } from "../utils/array";
import { Color, toHex } from "@bencoveney/utils/dist/color";
import { inverseLerp, lerp } from "../utils/maths";
import {
  array2dFlipY,
  array2dGetIndex,
  array2dMap,
  array2dReplace,
} from "../utils/array2d";

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

    const hoverIndex =
      hoverX !== null && hoverY !== null
        ? array2dGetIndex(terrain, hoverX, hoverY)
        : null;

    const scaledTerrain = array2dReplace(terrain, normalize(terrain.values));
    const colors = array2dMap(scaledTerrain, getColor);

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
  }, [canvasRef.current, hoverX, hoverY]);
  return (
    <canvas
      ref={canvasRef}
      width={terrain.xSize}
      height={terrain.ySize}
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

function getColor(height: number): Color {
  if (height < 0.2) {
    // Water
    const scale = inverseLerp(height, 0, 0.2);
    return {
      r: lerp(scale, 0, 23),
      g: lerp(scale, 55, 110),
      b: lerp(scale, 93, 128),
    };
  } else if (height >= 0.2 && height < 0.25) {
    const scale = inverseLerp(height, 0.2, 0.25);
    return {
      r: lerp(scale, 23, 50),
      g: lerp(scale, 110, 163),
      b: lerp(scale, 128, 171),
    };
  } else if (height >= 0.25 && height < 0.46) {
    const scale = inverseLerp(height, 0.25, 0.46);
    return {
      r: lerp(scale, 50, 88),
      g: lerp(scale, 163, 219),
      b: lerp(scale, 171, 202),
    };
  } else if (height >= 0.46 && height < 0.5) {
    // Sand
    const scale = inverseLerp(height, 0.46, 0.5);
    return {
      r: lerp(scale, 235, 148),
      g: lerp(scale, 196, 119),
      b: lerp(scale, 80, 3),
    };
  } else if (height >= 0.5 && height < 0.67) {
    // Vegetation
    const scale = inverseLerp(height, 0.5, 0.67);
    return {
      r: lerp(scale, 21, 18),
      g: lerp(scale, 126, 116),
      b: lerp(scale, 32, 49),
    };
  } else if (height >= 0.67 && height < 0.81) {
    const scale = inverseLerp(height, 0.67, 0.81);
    return {
      r: lerp(scale, 18, 12),
      g: lerp(scale, 116, 92),
      b: lerp(scale, 49, 52),
    };
  } else if (height >= 0.81 && height < 0.96) {
    // Cliffs
    const scale = inverseLerp(height, 0.81, 0.96);
    return {
      r: lerp(scale, 112, 76),
      g: lerp(scale, 117, 79),
      b: lerp(scale, 113, 100),
    };
  } else {
    // Snow
    const scale = inverseLerp(height, 0.96, 1);
    return {
      r: lerp(scale, 236, 223),
      g: lerp(scale, 240, 245),
      b: lerp(scale, 240, 245),
    };
  }
}
