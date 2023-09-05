import { Color } from "@bencoveney/utils/dist/color";
import { config } from "../config";
import {
  Array2d,
  array2dGetNeighbourIndices,
  array2dMap,
  array2dReplace,
} from "../utils/array2d";
import { TerrainColorMap } from "./registry";
import { empty } from "@bencoveney/utils/dist/array";

let id = 0;
export function findFeatures(heights: Array2d<number>) {
  const tested: number[] = [];
  const features: string[] = (
    empty(heights.values.length) as unknown[] as string[]
  ).fill("");
  array2dMap(heights, (value, x, y, index) => {
    // Check if this has already been tagged
    if (tested.includes(index)) {
      return;
    }
    tested.push(index);
    if (value < config.waterHeight) {
      const area = floodFill(heights, index, 0, config.waterHeight);
      tested.push(...area);
      const name = `water${id++}`;
      for (let areaIndex = 0; areaIndex < area.length; areaIndex++) {
        const index = area[areaIndex];
        features[index] = name;
      }
    } else {
      features[index] = "";
    }
  });
  let featuresArray = [];
  for (let index = 0; index < heights.values.values.length; index++) {
    featuresArray.push(index);
  }
  return array2dReplace(heights, features);
}

function floodFill(
  arr: Array2d<number>,
  index: number,
  min: number,
  max: number
): number[] {
  const result = [];
  const tested = [index];
  let stack = array2dGetNeighbourIndices(arr, index);
  while (stack.length > 0) {
    const current = stack.pop()!;
    const value = arr.values[current];
    if (value >= min && value < max) {
      result.push(current);
      const neighbours = array2dGetNeighbourIndices(arr, current, tested);
      tested.push(...neighbours);
      stack.push(...neighbours);
    }
  }
  return result;
}

const black: Color = { r: 0, g: 0, b: 0 };
const white: Color = { r: 0, g: 0, b: 0 };
export const featureColorMap: TerrainColorMap = {
  // lol
  "": white,
};
