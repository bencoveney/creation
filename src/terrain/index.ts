import {
  Array2d,
  array2dFlip,
  array2dGet,
  array2dIsInBounds,
  array2dMap,
  array2dMerge,
  array2dNormalize,
  array2dProduct,
  array2dScale,
  array2dSum,
} from "../utils/array2d";
import { biomeColorMap, getBiome } from "./biome";
import { findCoasts } from "./coasts";
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
  const heightP2 = array2dNormalize(perlin2dArray(width, height, 2));
  const heightP4 = array2dNormalize(perlin2dArray(width, height, 4));
  const heightP8 = array2dNormalize(perlin2dArray(width, height, 8));
  const heightP16 = array2dNormalize(perlin2dArray(width, height, 16));
  const heightP32 = array2dNormalize(perlin2dArray(width, height, 32));
  const heightP64 = array2dNormalize(perlin2dArray(width, height, 64));
  const rockHardness = array2dFlip(heightP16);
  const roughness = array2dFlip(heightP4);
  const heights = array2dNormalize(
    array2dSum(
      heightP2,
      heightP4,
      array2dScale(heightP8, 1 / 2),
      array2dScale(heightP16, 1 / 3),
      array2dProduct(heightP32, roughness, rockHardness, heightP4),
      array2dScale(
        array2dProduct(heightP64, roughness, rockHardness, heightP4),
        4 / 5
      )
    )
  );
  // TODO: angle calculations probably should be using a heightmap with water included.
  const temperature = array2dNormalize(perlin2dArray(width, height, 2));
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
  const angle = array2dMap(heights, (height, x, y) => {
    const dx = array2dIsInBounds(heights, x + 1, y)
      ? array2dGet(heights, x + 1, y) - height
      : 0;
    const dy = array2dIsInBounds(heights, x, y + 1)
      ? array2dGet(heights, x, y + 1) - height
      : 0;
    return Math.atan2(dy, dx);
  });
  const facingLeft = array2dNormalize(
    array2dMap(angle, (value) => -Math.abs(value))
  );
  const sunlight = array2dNormalize(array2dProduct(gradient, facingLeft));
  const coast = findCoasts(heights);
  const biome = array2dMerge(
    { heights, temperature, gradient, coast, rockHardness },
    ({ heights, temperature, gradient, coast, rockHardness }) =>
      getBiome(heights, temperature, gradient, coast, rockHardness)
  );
  const colors = array2dMerge(
    { heights, temperature, biome, sunlight },
    ({ heights, temperature, biome, sunlight }) =>
      getTerrainColor(heights, temperature, biome, sunlight)
  );

  const features = findFeatures(heights);

  terrainRegistry.push(
    { name: "heightP2", kind: "number", values: heightP2 },
    { name: "heightP4", kind: "number", values: heightP4 },
    { name: "heightP8", kind: "number", values: heightP8 },
    { name: "heightP16", kind: "number", values: heightP16 },
    { name: "heightP32", kind: "number", values: heightP32 },
    { name: "heightP64", kind: "number", values: heightP64 },
    { name: "rockHardness", kind: "number", values: rockHardness },
    { name: "roughness", kind: "number", values: roughness },
    { name: "heights", kind: "number", values: heights },
    { name: "gradient", kind: "number", values: gradient },
    { name: "angle", kind: "number", values: array2dNormalize(angle) },
    { name: "facingLeft", kind: "number", values: facingLeft },
    { name: "sunlight", kind: "number", values: sunlight },
    { name: "temperature", kind: "number", values: temperature },
    { name: "coast", kind: "number", values: coast },
    { name: "biome", kind: "string", values: biome, colorMap: biomeColorMap },
    {
      name: "features",
      kind: "string",
      values: features,
      colorMap: featureColorMap,
    },
    { name: "colors", kind: "color", values: colors }
  );
}
