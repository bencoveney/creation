import { empty } from "@bencoveney/utils/dist/array";
import { round } from "../utils/round";

export type Terrain = {
  heights: number[];
  width: number;
  height: number;
  waterLevel: number;
};

export function createTerrain(width: number, height: number): Terrain {
  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);
  const heights = empty(width * height).map((_, index) => {
    const position = getXY(width, height, index);
    const diffX = position.x - middleX;
    const diffY = position.y - middleY;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  });
  return { heights, width, height, waterLevel: 1 };
}

export function renderTerrain(terrain: Terrain) {
  let rendered = "";
  for (let y = 0; y < terrain.height; y++) {
    for (let x = 0; x < terrain.width; x++) {
      const index = getIndex(x, y, terrain.width, terrain.height);
      const height = terrain.heights[index];
      rendered += round(height, 2);
      rendered += ",";
    }
    rendered += "\n";
  }
  return rendered;
}

function getXY<T>(width: number, height: number, index: number) {
  return {
    x: index % width,
    y: Math.floor(index / height),
  };
}

export function getIndex(x: number, y: number, width: number, height: number) {
  return x + y * width;
}
