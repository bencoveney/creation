import { config } from "../config";
import {
  Array2d,
  array2dCreate,
  array2dMap,
  array2dGetCoords,
  array2dIsInBounds,
  array2dGetIndex,
} from "../utils/array2d";

export function runRainfall(
  heights: Array2d<number>,
  angles: Array2d<number>
): Array2d<number> {
  const rainfall = array2dCreate(angles.xSize, angles.ySize, 0);
  for (let index = 0; index < rainfall.values.length; index++) {
    createRaindrop(heights, rainfall, angles, index);
  }
  return rainfall;
}

export function identifyRivers(rainfall: Array2d<number>) {
  return array2dMap(rainfall, (value) => (value > 30 ? 1 : 0));
}

function createRaindrop(
  heights: Array2d<number>,
  rivers: Array2d<number>,
  angles: Array2d<number>,
  fromIndex: number
) {
  const visited = new Set<number>();
  let currentIndex = fromIndex;
  for (let i = 0; i < 100; i++) {
    if (visited.has(currentIndex)) {
      return;
    }
    visited.add(currentIndex);
    if (heights.values[currentIndex] < config.waterHeight) {
      return;
    }
    rivers.values[currentIndex] = rivers.values[currentIndex] + 1;
    const currentPos = array2dGetCoords(rivers, currentIndex);
    const angle = angles.values[currentIndex];
    // just switch on angle...
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    Math.sin(angle);
    const adjustedDx =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? Math.ceil(dx)
          : Math.floor(dx)
        : 0;
    const adjustedDy =
      Math.abs(dx) > Math.abs(dy) ? 0 : dy > 0 ? Math.ceil(dy) : Math.floor(dy);
    if (
      !array2dIsInBounds(
        rivers,
        currentPos[0] - adjustedDx,
        currentPos[1] - adjustedDy
      )
    ) {
      return;
    }
    const nextIndex = array2dGetIndex(
      rivers,
      currentPos[0] - adjustedDx,
      currentPos[1] - adjustedDy
    );
    if (nextIndex < 0 || nextIndex >= rivers.values.length) {
      return;
    }
    currentIndex = nextIndex;
  }
}
