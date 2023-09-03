export function round(value: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.floor(value * multiplier) / multiplier;
}

export function clamp(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}
