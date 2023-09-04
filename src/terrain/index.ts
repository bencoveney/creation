import {
  Array2d,
  array2dFrom,
  array2dMap,
  array2dMerge,
  array2dScale,
} from "../utils/array2d";
import { createPerlin } from "./perlin";

export type Terrain = {
  waterLevel: number;
} & Array2d<number>;

export function createTerrain(width: number, height: number): Terrain {
  const heights2 = perlin2dArray(width, height, 4);
  const heights4 = perlin2dArray(width, height, 8);
  const heights8 = array2dScale(perlin2dArray(width, height, 16), 1 / 2);
  const heights16 = array2dScale(perlin2dArray(width, height, 32), 1 / 3);
  const heights32 = array2dScale(perlin2dArray(width, height, 64), 1 / 4);
  const heights = array2dMerge(
    {
      heights2,
      heights4,
      heights8,
      heights16,
      heights32,
    },
    ({ heights2, heights4, heights8, heights16, heights32 }) =>
      heights2 + heights4 + heights8 + heights16 + heights32
  );
  const flipped = array2dMap(heights, (height) => 1 - Math.abs(height));
  return {
    ...flipped,
    waterLevel: 0.5,
  };
}

function perlin2dArray(xSize: number, ySize: number, noiseScale: number) {
  const values = getHeights(xSize, noiseScale).map((height) => height / 1);
  return array2dFrom(xSize, ySize, values);
}

function getHeights(dimension: number, noiseScale: number) {
  const perlin = createPerlin();
  const GRID_SIZE = 1 * noiseScale;
  const RESOLUTION = dimension / noiseScale;
  let num_pixels = GRID_SIZE / RESOLUTION;

  const heights = [];
  for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
    for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
      let v = perlin.get(x, y);
      heights.push(v + 1);
    }
  }
  return heights;
}

function sumHeights(...heights: number[][]) {
  const result = [];
  for (let position = 0; position < heights[0].length; position++) {
    let positionResult = 0;
    for (let set = 0; set < heights.length; set++) {
      positionResult += heights[set][position];
    }
    result.push(positionResult);
  }
  return result;
}
