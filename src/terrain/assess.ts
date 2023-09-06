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

  const includesFeatures = new Set<string>();
  const features = getTerrainLayer(
    terrain,
    "features"
  ) as TerrainRegistryStringEntry;
  features.values.values.forEach((f) => includesFeatures.add(f));

  return {
    percentWater: waterCount / temperature.values.values.length,
    averageTemp: totalTemperature / temperature.values.values.length,
    includesFeatures: [...includesFeatures.values()],
  };
}
