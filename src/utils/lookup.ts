export type HasId = {
  id: string;
};
export type NeedsId<T extends HasId> = Omit<T, "id">;

export type Lookup<T extends HasId> = {
  map: ReadonlyMap<string, T>;
  set: (value: T | NeedsId<T>) => T;
  nextId: () => string;
};

export function createLookup<T extends HasId>(): Lookup<T> {
  const map = new Map<string, T>();
  return {
    map,
    set: (value: T | NeedsId<T>): T => {
      // Pretend id is already there, we will ensure it gets populated.
      let castValue = value as T;
      if (!castValue.id) {
        const id = nextId();
        castValue.id = id;
      }
      map.set(castValue.id, castValue);
      return castValue;
    },
    nextId,
  };
}

// Globally unique so stuff can be shared between maps without conflicts.
let id = 0;
function nextId(): string {
  return "" + id++;
}

export function getFromLookup<T extends HasId>(
  lookup: Lookup<T> | undefined,
  key: string
): T {
  const found = getFromLookupSafe(lookup, key);
  if (found === undefined) {
    throw new Error(`Failed to get ${key} from lookup`);
  }
  return found;
}

export function getFromLookupSafe<T extends HasId>(
  lookup: Lookup<T> | undefined,
  key: string | undefined
): T | undefined {
  if (lookup && key && lookup.map.has(key)) {
    return lookup.map.get(key)!;
  }

  return undefined;
}

export function lookupKeys<T extends HasId>(lookup: Lookup<T>): string[] {
  return Array.from(lookup.map.keys());
}
export function lookupValues<T extends HasId>(lookup: Lookup<T>): T[] {
  return Array.from(lookup.map.values());
}
export function lookupEntries<T extends HasId>(
  lookup: Lookup<T>
): [string, T][] {
  return Array.from(lookup.map.entries());
}
export function lookupFirstValue<T extends HasId>(lookup: Lookup<T>): T {
  return lookup.map.values().next().value;
}
