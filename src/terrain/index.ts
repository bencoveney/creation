import {
  Array2d,
  array2dNormalize,
  array2dScale,
  array2dSum,
} from "../utils/array2d";
import { perlin2dArray } from "./perlin";

export type Terrain = {
  waterLevel: number;
} & Array2d<number>;

export function createTerrain(width: number, height: number): Terrain {
  const heights2 = perlin2dArray(width, height, 4);
  const heights4 = perlin2dArray(width, height, 8);
  const heights8 = array2dScale(perlin2dArray(width, height, 16), 1 / 2);
  const heights16 = array2dScale(perlin2dArray(width, height, 32), 1 / 3);
  const heights32 = array2dScale(perlin2dArray(width, height, 64), 1 / 4);
  const heights = array2dSum(
    heights2,
    heights4,
    heights8,
    heights16,
    heights32
  );
  // const flipped = array2dMap(
  //   array2dNormalize(heights),
  //   (height) => 1 - Math.abs(height - 0.5)
  // );
  return {
    ...array2dNormalize(heights),
    waterLevel: 0.5,
  };
}
