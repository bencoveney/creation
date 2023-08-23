function getPairings<T>(values: T[]): [T, T][] {
  let result: [T, T][] = [];
  for (let first = 0; first < values.length - 1; first++) {
    for (let second = first + 1; second < values.length; second++) {
      result.push([values[first], values[second]]);
    }
  }
  return result;
}
