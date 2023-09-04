import { empty } from "@bencoveney/utils/dist/array";

export type Array2d<T> = {
  xSize: number;
  ySize: number;
  values: T[];
};

export type FillFunc<T> = (x: number, y: number) => T;
export type Filler<T> = T | FillFunc<T>;
function isFillFunc<T>(filler: Filler<T>): filler is FillFunc<T> {
  return typeof filler === "function";
}

export function array2dCreate<T>(
  xSize: number,
  ySize: number,
  init?: Filler<T>
): Array2d<T> {
  const size = xSize * ySize;
  if (init) {
    if (isFillFunc(init)) {
      return {
        xSize,
        ySize,
        values: empty(size).map((_, index) => {
          const x = index % xSize;
          const y = Math.floor(index / ySize);
          return init(x, y);
        }),
      };
    } else {
      return {
        xSize,
        ySize,
        values: (empty(size) as T[]).fill(init as T),
      };
    }
  }
  return {
    xSize,
    ySize,
    values: empty(xSize * ySize) as T[],
  };
}

export function array2dFrom<T>(
  xSize: number,
  ySize: number,
  values: T[]
): Array2d<T> {
  return {
    xSize,
    ySize,
    values,
  };
}

export function array2dGet<T>(arr: Array2d<T>, x: number, y: number): T {
  return arr.values[x + y * arr.xSize];
}

export function array2dGetIndex<T>(
  arr: Array2d<T>,
  x: number,
  y: number
): number {
  return x + y * arr.xSize;
}

export function array2dGetCoords<T>(
  arr: Array2d<T>,
  index: number
): { x: number; y: number } {
  return {
    x: index % arr.xSize,
    y: Math.floor(index / arr.ySize),
  };
}

export function array2dIsInBounds<T>(
  arr: Array2d<T>,
  x: number,
  y: number
): boolean {
  return x >= 0 && x < arr.xSize && y >= 0 && y < arr.ySize;
}
