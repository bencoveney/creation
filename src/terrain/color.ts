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
  sunlight: number,
  snow: number,
  sand: number,
  icebergs: number,
  rivers: number,
  vegetation: number
): Color {
  if (rivers === 1) {
    return applySunlight(
      applySnow({ r: 88, g: 219, b: 202 }, snow, 0.5),
      sunlight,
      1 / 4
    );
  }
  switch (biome) {
    case Biome.DeepSea:
    case Biome.ShallowSea:
      return applySnow(getWaterColor(height, temperature), icebergs, 1);
    case Biome.Beach:
      return applySunlight(
        applySand(
          applySnow(getSandColor(height, temperature), snow, 0.8),
          sand,
          0.5
        ),
        sunlight,
        1 / 4
      );
    case Biome.Desert:
    case Biome.Grass:
    case Biome.Tundra:
      const color =
        vegetation === 1
          ? getVegetationColor(height, temperature)
          : getGroundColor(height, temperature);
      return applySunlight(
        applySand(applySnow(color, snow, 0.9), sand, 0.9),
        sunlight,
        1 / 4
      );
    case Biome.Mountain:
      return applySunlight(
        getCliffsColor(height, temperature),
        sunlight,
        1 / 4
      );
    case Biome.Snow:
      return applySunlight(getSnowColor(height, temperature), sunlight, 1 / 4);
    case Biome.Unknown:
      return { r: 255, g: 0, b: 0 };
  }
}

function applySunlight(
  color: Color,
  sunlight: number,
  strength: number
): Color {
  const shadow = 1 - sunlight;
  return validateColor({
    r: color.r + lerp(shadow, 0, -color.r * strength),
    g: color.g + lerp(shadow, 0, -color.g * strength),
    b: color.b + lerp(shadow, 0, -color.b * strength),
  });
}

function applySnow(color: Color, snow: number, amount: number): Color {
  const snowAmount = snow * amount;
  return {
    r: lerp(snowAmount, color.r, 230),
    g: lerp(snowAmount, color.g, 230),
    b: lerp(snowAmount, color.b, 230),
  };
}

function applySand(color: Color, snow: number, amount: number): Color {
  const snowAmount = snow * amount;
  return {
    r: lerp(snowAmount, color.r, 235),
    g: lerp(snowAmount, color.g, 196),
    b: lerp(snowAmount, color.b, 80),
  };
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

const ground1 = {
  r: 21,
  g: 126,
  b: 32,
};
const ground2 = {
  r: 18,
  g: 116,
  b: 49,
};
const ground3 = {
  r: 12,
  g: 92,
  b: 52,
};

function getGroundColor(height: number, temperature: number): Color {
  if (height < 0.67) {
    const scale = inverseLerp(height, 0.5, 0.67);
    return applyTemp(
      {
        r: lerp(scale, ground1.r, ground2.r),
        g: lerp(scale, ground1.g, ground2.g),
        b: lerp(scale, ground1.b, ground2.b),
      },
      temperature
    );
  } else {
    const scale = inverseLerp(height, 0.67, 0.81);
    return applyTemp(
      {
        r: lerp(scale, ground2.r, ground3.r),
        g: lerp(scale, ground2.g, ground3.g),
        b: lerp(scale, ground2.b, ground3.b),
      },
      temperature
    );
  }
}

const vegetation1 = {
  r: 4,
  g: 61,
  b: 10,
};
const vegetation2 = {
  r: 4,
  g: 48,
  b: 18,
};
const vegetation3 = {
  r: 1,
  g: 71,
  b: 36,
};

function getVegetationColor(height: number, temperature: number): Color {
  if (height < 0.67) {
    const scale = inverseLerp(height, 0.5, 0.67);
    return applyTemp(
      {
        r: lerp(scale, vegetation1.r, vegetation2.r),
        g: lerp(scale, vegetation1.g, vegetation2.g),
        b: lerp(scale, vegetation1.b, vegetation2.b),
      },
      temperature
    );
  } else {
    const scale = inverseLerp(height, 0.67, 0.81);
    return applyTemp(
      {
        r: lerp(scale, vegetation2.r, vegetation3.r),
        g: lerp(scale, vegetation2.g, vegetation3.g),
        b: lerp(scale, vegetation2.b, vegetation3.b),
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
