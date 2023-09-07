import { Array2d, array2dMerge } from "../utils/array2d";

export function plantVegetation(
  temperature: Array2d<number>,
  coast: Array2d<number>,
  heightP8: Array2d<number>
) {
  return array2dMerge(
    { temperature, coast, heightP8 },
    ({ temperature, coast, heightP8 }) => {
      const suitability = 1 - Math.abs(temperature - 0.5) * 2; // ;
      return suitability - 0.35 + coast > heightP8 ? 1 : 0; // temperature > from && temperature < to ? 1 : 0;
    }
  );
}
