import { empty } from "@bencoveney/utils/dist/array";

export type Terrain = {
  heights: number[];
  width: number;
  height: number;
  waterLevel: number;
};

export function createTerrain(width: number, height: number): Terrain {
  const middleX = width / 2 - 0.5;
  const middleY = height / 2 - 0.5;
  const heights = empty(width * height).map((_, index) => {
    const position = getXY(width, height, index);
    const diffX = position.x - middleX;
    const diffY = position.y - middleY;
    return Math.floor(Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)));
  });
  return { heights, width, height, waterLevel: 1 };
}

function getXY(width: number, height: number, index: number) {
  return {
    x: index % width,
    y: Math.floor(index / height),
  };
}

export function getIndex(x: number, y: number, width: number, height: number) {
  return x + y * width;
}
