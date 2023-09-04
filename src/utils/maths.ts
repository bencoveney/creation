export function round(value: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.floor(value * multiplier) / multiplier;
}

export function clamp(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}

// Project x (from 0 - 1) along range min -> max
export function lerp(x: number, min: number, max: number) {
  return (1 - x) * min + max * x;
  //return a + x * (b - a);
}

// Derive position (from 0 - 1) along range min -> max
export function inverseLerp(x: number, min: number, max: number) {
  return (x - min) / (max - min);
}
