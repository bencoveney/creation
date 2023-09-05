import { Color } from "@bencoveney/utils/dist/color";
import { inverseLerp, lerp } from "../utils/maths";
import { TerrainColorMap } from "./registry";

export function getNumberColor(value: number): Color {
  if (value < 0) {
    return {
      r: 255,
      g: 0,
      b: 0,
    };
  } else if (value > 1) {
    return {
      r: 0,
      g: 255,
      b: 0,
    };
  }
  const shade = lerp(value, 0, 255);
  return {
    r: shade,
    g: shade,
    b: shade,
  };
}

export function getStringColor(
  value: string,
  colorMap: TerrainColorMap
): Color {
  return colorMap[value];
}

export function getTerrainColor(height: number): Color {
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
