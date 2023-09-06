import { Color } from "@bencoveney/utils/dist/color";
import { clamp, inverseLerp, lerp } from "../utils/maths";
import { TerrainColorMap } from "./registry";
import { config } from "../config";
import { Biome } from "./biome";

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

export function getTerrainColor(
  height: number,
  temperature: number,
  biome: Biome,
  sunlight: number
): Color {
  switch (biome) {
    case Biome.DeepSea:
    case Biome.ShallowSea:
      return getWaterColor(height, temperature);
    case Biome.Beach:
      return applySunlight(getSandColor(height, temperature), sunlight);
    case Biome.Desert:
    case Biome.Grass:
    case Biome.Tundra:
      return applySunlight(getVegetationColor(height, temperature), sunlight);
    case Biome.Mountain:
      return applySunlight(getCliffsColor(height, temperature), sunlight);
    case Biome.Snow:
      return applySunlight(getSnowColor(height, temperature), sunlight);
    case Biome.Unknown:
      return { r: 255, g: 0, b: 0 };
  }
}

function applySunlight(color: Color, sunlight: number): Color {
  const shadow = 1 - sunlight;
  return validateColor({
    r: color.r + lerp(shadow, 0, -color.r / 4),
    g: color.g + lerp(shadow, 0, -color.g / 4),
    b: color.b + lerp(shadow, 0, -color.b / 4),
  });
}

function applyTemp(color: Color, temperature: number): Color {
  if (temperature <= 0.5) {
    const scale = temperature * 2;
    return clampColor({
      r: color.r + lerp(scale, 50, 0),
      g: color.g + lerp(scale, 50, 0),
      b: color.b + lerp(scale, 100, 0),
    });
  } else {
    const scale = (temperature - 0.5) * 2;
    return clampColor({
      ...color,
      r: color.r + lerp(scale, 0, 150),
      g: color.g + lerp(scale, 0, 50),
      b: color.b + lerp(scale, 0, 50),
    });
  }
}

function clampColor(color: Color) {
  return {
    r: clamp(0, 255, color.r),
    g: clamp(0, 255, color.g),
    b: clamp(0, 255, color.b),
  };
}

function validateColor(color: Color): Color {
  if (Number.isNaN(color.r) || color.r < 0 || color.r > 255) {
    throw new Error("Bad color");
  }
  if (Number.isNaN(color.g) || color.g < 0 || color.g > 255) {
    throw new Error("Bad color");
  }
  if (Number.isNaN(color.b) || color.b < 0 || color.b > 255) {
    throw new Error("Bad color");
  }
  return color;
}

function getSandColor(height: number, temperature: number): Color {
  const scale = inverseLerp(height, config.waterHeight, 0.5);
  return clampColor(
    applyTemp(
      {
        r: lerp(scale, 235, 148),
        g: lerp(scale, 196, 119),
        b: lerp(scale, 80, 3),
      },
      temperature
    )
  );
}

function getWaterColor(height: number, temperature: number): Color {
  if (height < config.waterStop1) {
    // Water
    const scale = inverseLerp(height, 0, config.waterStop1);
    return {
      r: lerp(scale, 0, 23),
      g: lerp(scale, 55, 110),
      b: lerp(scale, 93, 128),
    };
  } else if (height >= config.waterStop1 && height < config.waterStop2) {
    const scale = inverseLerp(height, config.waterStop1, config.waterStop2);
    return {
      r: lerp(scale, 23, 50),
      g: lerp(scale, 110, 163),
      b: lerp(scale, 128, 171),
    };
  } else {
    const scale = inverseLerp(height, config.waterStop2, config.waterHeight);
    return {
      r: lerp(scale, 50, 88),
      g: lerp(scale, 163, 219),
      b: lerp(scale, 171, 202),
    };
  }
}

function getVegetationColor(height: number, temperature: number): Color {
  if (height < 0.67) {
    const scale = inverseLerp(height, 0.5, 0.67);
    return applyTemp(
      {
        r: lerp(scale, 21, 18),
        g: lerp(scale, 126, 116),
        b: lerp(scale, 32, 49),
      },
      temperature
    );
  } else {
    const scale = inverseLerp(height, 0.67, 0.81);
    return applyTemp(
      {
        r: lerp(scale, 18, 12),
        g: lerp(scale, 116, 92),
        b: lerp(scale, 49, 52),
      },
      temperature
    );
  }
}

function getCliffsColor(height: number, temperature: number): Color {
  const scale = inverseLerp(height, 0.81, 0.96);
  return {
    r: lerp(scale, 112, 76),
    g: lerp(scale, 117, 79),
    b: lerp(scale, 113, 100),
  };
}

function getSnowColor(height: number, temperature: number): Color {
  const scale = inverseLerp(height, 0.96, 1);
  return {
    r: lerp(scale, 236, 223),
    g: lerp(scale, 240, 245),
    b: lerp(scale, 240, 245),
  };
}
