export function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function getQueryBool(name: string): boolean {
  return getQueryParam(name) === "1";
}

export function modifyQueryParam(name: string, value: string): void {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  var newPathname = window.location.pathname + "?" + params.toString();
  history.replaceState(null, "", newPathname);
}

export function modifyQueryBool(name: string, value: boolean): void {
  return modifyQueryParam(name, value ? "1" : "0");
}
