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
