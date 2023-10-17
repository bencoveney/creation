import { config } from "../config";
import {
  TerrainRegistry,
  TerrainRegistryNumberEntry,
  TerrainRegistryStringEntry,
  getTerrainLayer,
} from "./registry";

export type TerrainAssessment = {
  percentWater: number;
  averageTemp: number;
  includesFeatures: string[];
  rootConcept: string;
  affixConcepts: string[];
};

export function assessTerrain(terrain: TerrainRegistry): TerrainAssessment {
  const heights = getTerrainLayer(
    terrain,
    "heights"
  ) as TerrainRegistryNumberEntry;
  let waterCount = 0;
  for (let index = 0; index < heights.values.values.length; index++) {
    const height = heights.values.values[index];
    if (height < config.waterHeight) {
      waterCount++;
    }
  }

  const temperature = getTerrainLayer(
    terrain,
    "temperature"
  ) as TerrainRegistryNumberEntry;
  const totalTemperature = temperature.values.values.reduce((p, n) => p + n, 0);

  const includesUniqueFeatures = new Set<string>();
  const features = getTerrainLayer(
    terrain,
    "features"
  ) as TerrainRegistryStringEntry;
  features.values.values.forEach((f) => includesUniqueFeatures.add(f));

  const percentWater = waterCount / temperature.values.values.length;
  const averageTemp = totalTemperature / temperature.values.values.length;
  const includesFeatures = [...includesUniqueFeatures.values()];

  return {
    percentWater,
    averageTemp,
    includesFeatures,
    rootConcept:
      percentWater <= 0
        ? "terrain-water"
        : percentWater > 0.9
        ? "terrain-land"
        : "terrain-coast",
    affixConcepts: [
      averageTemp > 0.75
        ? "temp-hot"
        : averageTemp < 0.25
        ? "temp-cold"
        : "temp-average",
    ],
  };
}
