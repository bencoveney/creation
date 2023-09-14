import { Logger } from "../log";
import { HasAvailableActions } from "../decision/action";
import { HasNeeds } from "../decision/need";
import { Preferences } from "../decision/preference";
import { TerrainRegistry } from "../terrain/registry";
import { Lookup, lookupValues } from "./lookup";
import { Language } from "../language/language";
import { Tile, World } from "../world";

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

export type CurrentMovementActivity = {
  kind: "movement";
  moveToLocation: Coordinate;
  path: Coordinate[];
};
export type CurrentCreateArtifactActivity = {
  kind: "createArtifact";
};

export type CurrentGiveArtifactActivity = {
  kind: "giveArtifact";
  target: Being["id"];
  artifact: Artifact["id"];
};
export type CurrentAdoptSymbolActivity = {
  kind: "adoptSymbol";
};
export type CurrentConversationActivity = {
  kind: "conversation";
  target: Being["id"];
};

export type CurrentActivity =
  | CurrentMovementActivity
  | CurrentCreateArtifactActivity
  | CurrentGiveArtifactActivity
  | CurrentAdoptSymbolActivity
  | CurrentConversationActivity;

export type Relationships = {
  [being: string]: {
    kind: string;
    encounters: number;
  };
};

export type Being = HasNeeds & {
  id: string;
  kind: "deity";
  name: string;
  theme?: string;
  location?: string; // Region ID.
  motif?: Motif;
  currentActivity?: CurrentActivity;
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

export type History = HasAvailableActions & {
  regions: Lookup<Region>;
  beings: Lookup<Being>;
  dialects: Lookup<Dialect>;
  artifacts: Lookup<Artifact>;
  log: Logger;
  tick: number;
  world: null | World;
  terrainRegistry: TerrainRegistry;
};

export function getDeities(beings: Lookup<Being>): Being[] {
  return lookupValues(beings).filter((being) => being.kind === "deity");
}

export function getDeitiesByActivity(
  beings: Lookup<Being>,
  kind: CurrentActivity["kind"]
): Being[] {
  return getDeities(beings).filter(
    (being) => being.currentActivity?.kind === kind
  );
}
