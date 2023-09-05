import { TerrainColorMap } from "./registry";

export enum Biome {
  DeepSea = "DeepSea",
  ShallowSea = "ShallowSea",
  Beach = "Beach",
  Grass = "Grass",
  Mountain = "Mountain",
  Snow = "Snow",
  Unknown = "Unknown",
  Desert = "Desert",
  Tundra = "Tundra",
}

export const biomeColorMap: TerrainColorMap = {
  [Biome.DeepSea]: {
    r: 23,
    g: 110,
    b: 128,
  },
  [Biome.ShallowSea]: {
    r: 50,
    g: 163,
    b: 171,
  },
  [Biome.Beach]: {
    r: 235,
    g: 196,
    b: 80,
  },
  [Biome.Grass]: {
    r: 18,
    g: 116,
    b: 49,
  },
  [Biome.Desert]: {
    r: 255,
    g: 242,
    b: 179,
  },
  [Biome.Tundra]: {
    r: 230,
    g: 255,
    b: 230,
  },
  [Biome.Mountain]: {
    r: 112,
    g: 117,
    b: 113,
  },
  [Biome.Snow]: {
    r: 236,
    g: 240,
    b: 240,
  },
  [Biome.Unknown]: {
    r: 255,
    g: 0,
    b: 0,
  },
};

export function getBiome(
  height: number,
  temperature: number,
  gradient: number
): Biome {
  if (height < 0.25) {
    return Biome.DeepSea;
  }
  if (height < 0.46) {
    return Biome.ShallowSea;
  }
  if (height < 0.5 && gradient < 0.35) {
    return Biome.Beach;
  }
  if (gradient > 0.7) {
    return Biome.Mountain;
  }
  if (height < 0.81) {
    if (temperature > 0.7) {
      return Biome.Desert;
    }
    if (temperature < 0.3) {
      return Biome.Tundra;
    }
    return Biome.Grass;
  }
  if (height < 0.96) {
    return Biome.Mountain;
  }
  if (height <= 1) {
    return Biome.Snow;
  }
  return Biome.Unknown;
}

// function getBiomeColor(height: string, biome: string) {}
