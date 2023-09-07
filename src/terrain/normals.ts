import {
  Array2d,
  array2dGet,
  array2dIsInBounds,
  array2dMap,
  array2dNormalize,
} from "../utils/array2d";

export function findGradient(heights: Array2d<number>): Array2d<number> {
  return array2dNormalize(
    array2dMap(heights, (height, x, y) => {
      const dx = array2dIsInBounds(heights, x + 1, y)
        ? array2dGet(heights, x + 1, y) - height
        : 0;
      const dy = array2dIsInBounds(heights, x, y + 1)
        ? array2dGet(heights, x, y + 1) - height
        : 0;
      return Math.sqrt(dx * dx + dy * dy);
    })
  );
}

export function findAngle(heights: Array2d<number>): Array2d<number> {
  return array2dMap(heights, (height, x, y) => {
    const dx = array2dIsInBounds(heights, x + 1, y)
      ? array2dGet(heights, x + 1, y) - height
      : 0;
    const dy = array2dIsInBounds(heights, x, y + 1)
      ? array2dGet(heights, x, y + 1) - height
      : 0;
    return Math.atan2(dy, dx);
  });
}
