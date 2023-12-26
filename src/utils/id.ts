let id = 0;
export function nextId(prefix = ""): string {
  return `${prefix}${id++}`;
}
