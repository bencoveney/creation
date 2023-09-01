export function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function getQueryBool(name: string): boolean {
  return getQueryParam(name) === "1";
}
