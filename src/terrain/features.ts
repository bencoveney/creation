import { Color } from "@bencoveney/utils/dist/color";
import { config } from "../config";
import {
  Array2d,
  array2dGetNeighbourIndices,
  array2dMap,
  array2dReplace,
  neighbours4,
} from "../utils/array2d";
import { TerrainColorMap } from "./registry";
import { empty } from "@bencoveney/utils/dist/array";

function getWaterFeature(area: number) {
  if (area < 100) {
    return "lake";
  } else if (area < 500) {
    return "sea";
  } else {
    return "ocean";
  }
}

function getLandFeature(area: number) {
  if (area < 500) {
    return "island";
  } else {
    return "continent";
  }
}

let id = 0;
export function findFeatures(heights: Array2d<number>) {
  const tested: Set<number> = new Set();
  const features: string[] = (
    empty(heights.values.length) as unknown[] as string[]
  ).fill("");
  array2dMap(heights, (value, x, y, index) => {
    // Check if this has already been tagged
    if (tested.has(index)) {
      return;
    }
    tested.add(index);
    if (value < config.waterHeight) {
      const area = floodFill(heights, index, 0, config.waterHeight);
      const name = `${getWaterFeature(area.length)}_${id++}`;
      for (let areaIndex = 0; areaIndex < area.length; areaIndex++) {
        const index = area[areaIndex];
        tested.add(index);
        features[index] = name;
      }
    } else {
      const area = floodFill(heights, index, config.waterHeight, 2);
      const name = `${getLandFeature(area.length)}_${id++}`;
      for (let areaIndex = 0; areaIndex < area.length; areaIndex++) {
        const index = area[areaIndex];
        tested.add(index);
        features[index] = name;
      }
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
  const result = [index];
  const tested = new Set([index]);
  let stack = array2dGetNeighbourIndices(arr, index, neighbours4);
  while (stack.length > 0) {
    const current = stack.pop()!;
    const value = arr.values[current];
    if (value >= min && value < max) {
      result.push(current);
      const neighbours = array2dGetNeighbourIndices(
        arr,
        current,
        neighbours4,
        tested
      );
      for (let neighbour = 0; neighbour < neighbours.length; neighbour++) {
        tested.add(neighbours[neighbour]);
        stack.push(neighbours[neighbour]);
      }
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
