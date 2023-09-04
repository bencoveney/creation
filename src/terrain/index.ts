import { Array2d, array2dFrom } from "../utils/array2d";
import { createPerlin } from "./perlin";

export type Terrain = {
  waterLevel: number;
} & Array2d<number>;

export function createTerrain(width: number, height: number): Terrain {
  const heights2 = getHeights(width, 4).map((height) => height / 1);
  const heights4 = getHeights(width, 8).map((height) => height / 1);
  const heights8 = getHeights(width, 16).map((height) => height / 2);
  const heights16 = getHeights(width, 32).map((height) => height / 3);
  const heights32 = getHeights(width, 64).map((height) => height / 4);
  const heights = sumHeights(
    heights2,
    heights4,
    heights8,
    heights16,
    heights32
  ).map((height) => 1 - Math.abs(height));
  return {
    ...array2dFrom(width, height, heights),
    waterLevel: 0.5,
  };
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
