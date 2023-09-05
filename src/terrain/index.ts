import {
  Array2d,
  array2dGet,
  array2dIsInBounds,
  array2dMap,
  array2dMerge,
  array2dNormalize,
  array2dScale,
  array2dSum,
} from "../utils/array2d";
import { biomeColorMap, getBiome } from "./biome";
import { getTerrainColor } from "./color";
import { featureColorMap, findFeatures } from "./features";
import { perlin2dArray } from "./perlin";
import { TerrainRegistry } from "./registry";

export type Terrain = {
  // waterLevel: number;
} & Array2d<number>;

export function createTerrain(
  width: number,
  height: number,
  terrainRegistry: TerrainRegistry
) {
  const heights2 = array2dNormalize(perlin2dArray(width, height, 4));
  const heights4 = array2dNormalize(perlin2dArray(width, height, 8));
  const heights8 = array2dNormalize(perlin2dArray(width, height, 16));
  const heights16 = array2dNormalize(perlin2dArray(width, height, 32));
  const heights32 = array2dNormalize(perlin2dArray(width, height, 64));
  const heights = array2dNormalize(
    array2dSum(
      heights2,
      heights4,
      array2dScale(heights8, 1 / 2),
      array2dScale(heights16, 1 / 3),
      array2dScale(heights32, 1 / 4)
    )
  );
  const temperature = array2dNormalize(perlin2dArray(width, height, 4));
  const gradient = array2dNormalize(
    array2dMap(heights, (height, x, y) => {
      const dx = array2dIsInBounds(heights, x + 1, y)
        ? array2dGet(heights, x + 1, y) - height
        : 0;
      const dy = array2dIsInBounds(heights, x, y + 1)
        ? array2dGet(heights, x, y + 1) - height
        : 0;
      return Math.sqrt(dx * dx + dy * dy);
    })
  );
  const biome = array2dMerge(
    { heights, temperature, gradient },
    ({ heights, temperature, gradient }) =>
      getBiome(heights, temperature, gradient)
  );
  // const flipped = array2dMap(
  //   array2dNormalize(heights),
  //   (height) => 1 - Math.abs(height - 0.5)
  // );
  const colors = array2dMap(heights, getTerrainColor);

  const features = findFeatures(heights);

  terrainRegistry.push(
    { name: "heights2", kind: "number", values: heights2 },
    { name: "heights4", kind: "number", values: heights4 },
    { name: "heights8", kind: "number", values: heights8 },
    { name: "heights16", kind: "number", values: heights16 },
    { name: "heights32", kind: "number", values: heights32 },
    { name: "heights", kind: "number", values: heights },
    { name: "gradient", kind: "number", values: gradient },
    { name: "temperature", kind: "number", values: temperature },
    { name: "biome", kind: "string", values: biome, colorMap: biomeColorMap },
    { name: "colors", kind: "color", values: colors },
    {
      name: "features",
      kind: "string",
      values: features,
      colorMap: featureColorMap,
    }
  );
}
