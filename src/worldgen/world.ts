import { empty } from "@bencoveney/utils/dist/array";

export type Tile = {
  x: number;
  y: number;
  location: string;
};

export type World = {
  cells: Tile[];
  width: number;
  height: number;
};

export function createWorld(width: number, height: number): World {
  return {
    width: width,
    height: height,
    cells: empty(width * height).map((_, index) => ({
      x: index % width,
      y: Math.floor(index / height),
      location: "",
    })),
  };
}

export function getTile(world: World, x: number, y: number) {
  return world.cells[x + y * world.width];
}
