import { empty } from "@bencoveney/utils/dist/array";
import { normalize } from "./array";

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
): [number, number] {
  return [index % arr.xSize, Math.floor(index / arr.ySize)];
}

export function array2dIsInBounds<T>(
  arr: Array2d<T>,
  x: number,
  y: number
): boolean {
  return x >= 0 && x < arr.xSize && y >= 0 && y < arr.ySize;
}

export function array2dMap<T, U>(
  arr: Array2d<T>,
  mapper: (value: T, x: number, y: number, index: number) => U
): Array2d<U> {
  return {
    xSize: arr.xSize,
    ySize: arr.ySize,
    values: arr.values.map((value, index) =>
      mapper(value, index % arr.xSize, Math.floor(index / arr.ySize), index)
    ),
  };
}

export function array2dReplace<T, U>(
  arr: Array2d<T>,
  newValues: U[]
): Array2d<U> {
  return {
    xSize: arr.xSize,
    ySize: arr.ySize,
    values: newValues,
  };
}

export function array2dFlipY<T>(arr: Array2d<T>, y: number): number {
  return arr.ySize - y - 1;
}

export function array2dMerge<T extends {}, U>(
  arr: { [Property in keyof T]: Array2d<T[Property]> },
  merger: (value: T, x: number, y: number, index: number) => U
): Array2d<U> {
  const keys = Object.keys(arr) as Array<keyof T>;
  const anyArr = arr[keys[0]];
  const length = anyArr.values.length;
  const values: U[] = [];
  const param: Partial<T> = {};
  for (let index = 0; index < length; index++) {
    for (let key = 0; key < keys.length; key++) {
      param[keys[key]] = arr[keys[key]].values[index];
    }
    values.push(
      merger(
        param as T,
        index % anyArr.xSize,
        Math.floor(index / anyArr.ySize),
        index
      )
    );
  }
  return array2dReplace(anyArr, values);
}

export function array2dSum(...arrs: Array2d<number>[]): Array2d<number> {
  const anyArr = arrs[0];
  const length = anyArr.values.length;
  const values: number[] = [];
  for (let index = 0; index < length; index++) {
    values.push(0);
    for (let arr = 0; arr < arrs.length; arr++) {
      values[index] += arrs[arr].values[index];
    }
  }
  return array2dReplace(anyArr, values);
}

export function array2dProduct(...arrs: Array2d<number>[]): Array2d<number> {
  const anyArr = arrs[0];
  const length = anyArr.values.length;
  const values: number[] = [];
  for (let index = 0; index < length; index++) {
    values.push(0);
    for (let arr = 0; arr < arrs.length; arr++) {
      values[index] += arrs[arr].values[index];
    }
  }
  return array2dReplace(anyArr, values);
}

export function array2dScale(
  arr: Array2d<number>,
  by: number
): Array2d<number> {
  const multiplied = [];
  for (let index = 0; index < arr.values.length; index++) {
    multiplied.push(arr.values[index] * by);
  }
  return array2dReplace(arr, multiplied);
}

export function array2dNormalize(arr: Array2d<number>): Array2d<number> {
  return array2dReplace(arr, normalize(arr.values));
}

export function array2dSlice<T>(
  arr: Array2d<T>,
  fromX: number,
  fromY: number,
  xSize: number,
  ySize: number
): Array2d<T> {
  const result = array2dCreate<T>(xSize, ySize);
  for (let xOffset = 0; xOffset < xSize; xOffset++) {
    for (let yOffset = 0; yOffset < ySize; yOffset++) {
      const sourceValue = array2dGet(arr, fromX + xOffset, fromY + yOffset);
      const mappedIndex = array2dGetIndex(result, xOffset, yOffset);
      result.values[mappedIndex] = sourceValue;
    }
  }
  return result;
}

const neighbourPositions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function array2dGetNeighbourIndices<T>(
  arr: Array2d<T>,
  index: number,
  excluding?: Set<number>
): number[] {
  const [positionX, positionY] = array2dGetCoords(arr, index);
  const result = [];
  for (let neighbour = 0; neighbour < neighbourPositions.length; neighbour++) {
    const [xOffset, yOffset] = neighbourPositions[neighbour];
    const x = positionX + xOffset;
    const y = positionY + yOffset;
    if (array2dIsInBounds(arr, x, y)) {
      const index = array2dGetIndex(arr, x, y);
      if (!excluding?.has(index)) {
        result.push(index);
      }
    }
  }
  return result;
}
