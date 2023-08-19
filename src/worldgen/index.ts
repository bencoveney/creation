import { Lookup, createLookup } from "../utils/lookup";
import { Language } from "./language";

export type Region = {
  id: string;
  name: string;
};

export type Being = {
  id: string;
  name: string;
};

export type Dialect = {
  id: string;
  language: Language;
};

export type World = {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
};

export function initWorld(): World {
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
  };
}

export function tickWorld(world: World) {}
