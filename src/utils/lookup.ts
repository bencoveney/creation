export type HasId = {
  id: string;
};
export type NeedsId<T extends HasId> = Omit<T, "id">;

export type Lookup<T extends HasId> = {
  map: ReadonlyMap<string, T>;
  set: (value: NeedsId<T>) => string;
  nextId: () => string;
};

export function createLookup<T extends HasId>(): Lookup<T> {
  const map = new Map<string, T>();
  return {
    map,
    set: (value: NeedsId<T>) => {
      const id = nextId();
      (value as T).id = id;
      map.set(id, value as T);
      return id;
    },
    nextId,
  };
}

let id = 0;
function nextId(): string {
  return "" + id++;
}
