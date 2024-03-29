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
import { Tile, World } from "../world";
import { Activity, HasActivities } from "../decision/activity";
import { Language } from "../language";
import { HasNames } from "../language/names";
import { ArtifactPart } from "../artifact/config";

export type Region = HasNames & {
  id: string;
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
    role: string;
    theme?: string;
    location?: string; // Region ID.
    motif?: Motif;
    holding: string[];
    relationships: Relationships;
    preferences: Preferences;
    timesChosen: Preferences;
  };

export type ArtifactDecoration = {
  kind: "motif";
  value: string;
  location: string;
};

export type Artifact = HasNames & {
  id: string;
  object: string;
  creators: string[];
  inPosessionOf: string;
  parts: ArtifactPart[];
};

export type History = HasAvailableActions<TileAction> & {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  languages: Lookup<Language>;
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
