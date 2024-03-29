export function commaSeparate(values: string[]) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, values.length - 1).join(", ")} and ${
    values[values.length - 1]
  }`;
}

function stringComparer(a: string, b: string): number {
  return a.localeCompare(b);
}
export function sortStrings(values: string[]): string[] {
  return values.toSorted(stringComparer);
}
