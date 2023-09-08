import { config } from "../../config";
import { Array2d, array2dMerge } from "../../utils/array2d";
import { inverseLerp } from "../../utils/maths";

export function getSnow(
  noise: Array2d<number>,
  height: Array2d<number>,
  temperature: Array2d<number>
) {
  return array2dMerge(
    { noise, height, temperature },
    ({ noise, height, temperature }) => {
      if (height < config.waterHeight) {
        return 0;
      }
      if (temperature < 0.25) {
        return 1;
      }
      if (temperature < 0.3) {
        const scaled = inverseLerp(temperature, 0.25, 0.3);
        return scaled < noise ? 1 : 0;
      } else return 0;
    }
  );
}

export function getSand(
  noise: Array2d<number>,
  height: Array2d<number>,
  temperature: Array2d<number>
) {
  return array2dMerge(
    { noise, height, temperature },
    ({ noise, height, temperature }) => {
      if (height < config.waterHeight) {
        return 0;
      }
      if (temperature > 0.75) {
        return 1;
      }
      if (temperature > 0.7) {
        const scaled = inverseLerp(temperature, 0.75, 0.7);
        return scaled < noise ? 1 : 0;
      } else return 0;
    }
  );
}

export function getIcebergs(
  noise: Array2d<number>,
  heights: Array2d<number>,
  heightP32: Array2d<number>,
  temperature: Array2d<number>
) {
  return array2dMerge(
    { noise, heights, heightP32, temperature },
    ({ noise, heights, heightP32, temperature }) => {
      if (heights > config.waterHeight) {
        return 0;
      }
      let isFrozen = 0;
      if (temperature < 0.25) {
        isFrozen = 1;
      }
      if (temperature < 0.3) {
        const scaled = inverseLerp(temperature, 0.25, 0.3);
        isFrozen = scaled < noise ? 1 : 0;
      }
      if (isFrozen) {
        const frozenAmount = inverseLerp(temperature, 0.3, 0);
        const icebergChance = frozenAmount > heightP32;
        return icebergChance ? 1 : 0;
      }
      return 0;
    }
  );
}
