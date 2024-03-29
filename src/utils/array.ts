import { inverseLerp } from "./maths";

function getPairings<T>(values: T[]): [T, T][] {
  let result: [T, T][] = [];
  for (let first = 0; first < values.length - 1; first++) {
    for (let second = first + 1; second < values.length; second++) {
      result.push([values[first], values[second]]);
    }
  }
  return result;
}

export function getMin(values: number[]): number {
  if (values.length === 0) {
    throw new Error("What?");
  }
  let lowest = values[0];
  for (let i = 1; i < values.length; i++) {
    lowest = Math.min(lowest, values[i]);
  }
  return lowest;
}

export function getMax(values: number[]): number {
  if (values.length === 0) {
    throw new Error("What?");
  }
  let highest = values[0];
  for (let i = 1; i < values.length; i++) {
    highest = Math.max(highest, values[i]);
  }
  return highest;
}

export function getMinAndMax(values: number[]): { min: number; max: number } {
  if (values.length === 0) {
    throw new Error("What?");
  }
  let highest = values[0];
  let lowest = values[0];
  for (let i = 1; i < values.length; i++) {
    highest = Math.max(highest, values[i]);
    lowest = Math.min(lowest, values[i]);
  }
  return { min: lowest, max: highest };
}

export function normalize(values: number[]): number[] {
  const { min, max } = getMinAndMax(values);
  return values.map((value) => inverseLerp(value, min, max));
}

export function last<T>(values: T[]): T | undefined {
  if (values.length === 0) {
    return undefined;
  }
  return values[values.length - 1];
}

export function unique<T>(values: T[]): T[] {
  if (values.length <= 1) {
    return values;
  }
  const uniqueValues = [values[0]];
  for (let index = 1; index < values.length; index++) {
    const next = values[index];
    if (!uniqueValues.includes(next)) {
      uniqueValues.push(next);
    }
  }
  return uniqueValues;
}
