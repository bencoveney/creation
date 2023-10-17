import { Logger } from "../log";
import {
  BeingAction,
  HasAvailableActions,
  TileAction,
} from "../decision/action";
import { HasNeeds } from "../decision/need";
import { Preferences } from "../decision/preference";
import { TerrainRegistry } from "../terrain/registry";
import { Lookup, lookupValues } from "./lookup";
import { Language } from "../language/index";
import { Tile, World } from "../world";
import { Activity, HasActivities } from "../decision/activity";
import { HasNames, NewLanguage } from "../language/names";

export type Region = HasNames & {
  id: string;
  name: string;
  tile?: Tile;
  discovered: Boolean;
  parent?: Region;
};

export type Motif = {
  kind: "symbol";
  value: string;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Relationships = {
  [being: string]: {
    kind: string;
    encounters: number;
  };
};

export type Being = HasAvailableActions<BeingAction> &
  HasNeeds &
  HasActivities &
  HasNames & {
    id: string;
    kind: "deity";
    name: string;
    theme?: string;
    location?: string; // Region ID.
    motif?: Motif;
    holding: string[];
    relationships: Relationships;
    preferences: Preferences;
    timesChosen: Preferences;
  };

export type Dialect = {
  id: string;
  language: Language;
};

export type Artifact = HasNames & {
  id: string;
  name: string;
  object: string;
  creators: string[];
  inPosessionOf: string;
};

export type History = HasAvailableActions<TileAction> & {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  languages: Lookup<NewLanguage>;
  artifacts: Lookup<Artifact>;
  log: Logger;
  tick: number;
  world: null | World;
  terrainRegistry: TerrainRegistry;
};

export function getBeingsByActivity(
  beings: Lookup<Being>,
  kind: Activity["kind"]
): Being[] {
  return lookupValues(beings).filter(
    (being) => being.activities.length > 0 && being.activities[0]!.kind === kind
  );
}
