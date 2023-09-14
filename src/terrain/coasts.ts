import { distanceEuclidean2 } from "@bencoveney/utils/dist/vector";
import { config } from "../config";
import {
  Array2d,
  array2dMap,
  array2dGetNeighbourIndices,
  neighbours24,
  array2dGetCoords,
} from "../utils/array2d";
import { inverseLerp } from "../utils/maths";

const maxDistance = distanceEuclidean2({ x: 0, y: 0 }, { x: 2, y: 2 });

export function findCoasts(heights: Array2d<number>): Array2d<number> {
  const coasts = array2dMap(heights, (height): number =>
    height > config.waterHeight ? 0 : 1
  );
  array2dMap(coasts, (value, x, y, index) => {
    if (value === 1) {
      const neighbours = array2dGetNeighbourIndices(
        coasts,
        index,
        neighbours24
      );
      for (let neighbour = 0; neighbour < neighbours.length; neighbour++) {
        const neighbourIndex = neighbours[neighbour];
        const current = coasts.values[neighbourIndex];

        const [neighbourX, neighbourY] = array2dGetCoords(
          coasts,
          neighbourIndex
        );
        const distance = distanceEuclidean2(
          { x, y },
          { x: neighbourX, y: neighbourY }
        );
        const coastal = inverseLerp(
          maxDistance - distance * 0.9,
          0,
          maxDistance
        );
        coasts.values[neighbourIndex] = Math.max(current, coastal);
      }
    }
  });
  return coasts;
}
