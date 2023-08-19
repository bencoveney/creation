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
