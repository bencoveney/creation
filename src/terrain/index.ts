import {
  Array2d,
  array2dMap,
  array2dNormalize,
  array2dScale,
  array2dSum,
} from "../utils/array2d";
import { getTerrainColor } from "./color";
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
  // const flipped = array2dMap(
  //   array2dNormalize(heights),
  //   (height) => 1 - Math.abs(height - 0.5)
  // );
  const colors = array2dMap(heights, getTerrainColor);

  terrainRegistry.push(
    { name: "heights2", kind: "number", values: heights2 },
    { name: "heights4", kind: "number", values: heights4 },
    { name: "heights8", kind: "number", values: heights8 },
    { name: "heights16", kind: "number", values: heights16 },
    { name: "heights32", kind: "number", values: heights32 },
    { name: "heights", kind: "number", values: heights },
    { name: "colors", kind: "color", values: colors }
  );
}
