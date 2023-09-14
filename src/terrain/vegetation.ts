import { Array2d, array2dMerge } from "../utils/array2d";

export function plantVegetation(
  temperature: Array2d<number>,
  heightP8: Array2d<number>,
  noise: Array2d<number>
) {
  return array2dMerge(
    { temperature, heightP8, noise },
    ({ temperature, heightP8, noise }) => {
      const suitability = 1 - Math.abs(temperature * noise - 0.5);
      return suitability - 0.35 > heightP8 ? 1 : 0;
    }
  );
}
