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
import { Language } from "../language/language";
import { Tile, World } from "../world";
import { Activity, HasActivities } from "../decision/activity";

export type Region = {
  id: string;
  name: string;
  tile?: Tile;
  discovered: Boolean;
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
  HasActivities & {
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

export type Artifact = {
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
