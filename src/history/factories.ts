import { Artifact, Being, History, Region } from ".";
import { config } from "../config";
import {
  randomChoice,
  randomChoices,
  randomInt,
  rollDice,
} from "../utils/random";
import {
  createDeityNeeds,
  createDeityPreferences,
  initialBeingActions,
} from "../decision/factories";
import { Preferences } from "../decision/preference";
import { createWorld } from "../world";
import { Lookup, createLookup } from "./lookup";
import { createLogger } from "../log";
import { createTerrain } from "../terrain";
import {
  TerrainRegistry,
  TerrainRegistryStringEntry,
  getTerrainLayer,
} from "../terrain/registry";
import { Language, createNames, createLanguage } from "../language";

export function initialiseHistory() {
  const terrainRegistry: TerrainRegistry = [];
  createTerrain(
    config.worldWidth * config.terrainResolution,
    config.worldHeight * config.terrainResolution,
    terrainRegistry
  );
  const result: History = {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    languages: createLookup<Language>(),
    artifacts: createLookup<Artifact>(),
    log: createLogger(0),
    tick: 0,
    world: null,
    terrainRegistry,
    availableActions: [],
  };
  result.languages.set(createLanguage());
  createWorldRegion(result.regions);
  createInitialDeities(result);
  if (result.regions.map.size >= 1 && !result.world) {
    result.world = createWorld(result, config.worldWidth, config.worldHeight);
  }
  createFeatureRegions(result.regions, result.terrainRegistry);
  return result;
}

export function createWorldRegion(regions: Lookup<Region>): Region {
  return regions.set({
    names: createNames("world"),
    discovered: true,
  });
}

function createFeatureRegions(
  regions: Lookup<Region>,
  terrainRegistry: TerrainRegistry
): void {
  const features = getTerrainLayer(
    terrainRegistry,
    "features"
  ) as TerrainRegistryStringEntry;
  const found = new Set<string>();
  for (let i = 0; i < features.values.values.length; i++) {
    found.add(features.values.values[i]);
  }
  const foundFeatures = Array.from(found.values());
  for (let i = 0; i < foundFeatures.length; i++) {
    const foundFeature = foundFeatures[i];
    const featureKind = foundFeature.split("_")[0];
    regions.set({
      discovered: true,
      names: createNames(featureKind),
    });
  }
}

export type Theme = {
  name: string;
  categories: string[];
  tags: string[];
};

const themesByName = new Map<string, Theme>();
function populatethemesByName() {
  if (themesByName.size > 0) {
    return;
  }
  config.themes.forEach((theme) => {
    themesByName.set(theme.name, theme);
  });
}

const themesByCategory = new Map<string, Theme[]>();
function populateThemesByCategory() {
  if (themesByCategory.size > 0) {
    return;
  }
  config.themes.forEach((theme) => {
    theme.categories.forEach((category) => {
      if (!themesByCategory.has(category)) {
        themesByCategory.set(category, []);
      }
      const themes = themesByCategory.get(category)!;
      themes.push(theme);
    });
  });
}

const themesByTag = new Map<string, Theme[]>();
function populateThemesByTag() {
  if (themesByTag.size > 0) {
    return;
  }
  config.themes.forEach((theme) => {
    theme.tags.forEach((tag) => {
      if (!themesByTag.has(tag)) {
        themesByTag.set(tag, []);
      }
      const themes = themesByTag.get(tag)!;
      themes.push(theme);
    });
  });
}

type DeityTheme = {
  theme: string;
  relationshipKind?: string;
  relationshipTo?: string[];
};

export function createInitialDeities(history: History) {
  const deityThemes = getDeityThemes();
  const deities = deityThemes.map((deityTheme) => {
    const deity = createDeity(history.beings, deityTheme.theme);
    history.log(
      `[[${deity.names.defaultKey}]] woke from their slumber.`,
      [deity.id],
      [],
      []
    );
    return deity;
  });
  deityThemes.forEach((deityTheme) => {
    const deity = deities.find((d) => d.theme === deityTheme.theme);
    if (deityTheme.relationshipKind) {
      deityTheme.relationshipTo?.forEach((relationshipTo) => {
        const other = deities.find((d) => d.theme === relationshipTo);
        deity!.relationships[other!.id] = {
          kind: deityTheme.relationshipKind!,
          encounters: 0,
        };
      });
    }
  });
}

function getDeityThemes(): DeityTheme[] {
  populatethemesByName();
  populateThemesByCategory();
  populateThemesByTag();

  const selectedCategories = randomChoices(
    [...themesByCategory.keys()],
    randomInt(config.themeRange.min, config.themeRange.max)
  );
  const groups = selectedCategories.flatMap((category) => {
    const themes = themesByCategory.get(category)!;
    const isRelationship = rollDice(config.deityRelationshipChance);
    const relationship = isRelationship
      ? getRelationship(themes.length)
      : undefined;
    const themeNames = themes.map((theme) => theme.name);
    return themes.map<DeityTheme>((theme) => ({
      theme: theme.name,
      relationshipKind: relationship,
      relationshipTo: isRelationship
        ? themeNames.filter((name) => name !== theme.name)
        : undefined,
    }));
  });
  return groups;
}

function getRelationship(count: number): string {
  if (count === 2) {
    return randomChoice(["sibling", "partner", "lover"]);
  } else {
    return randomChoice(["sibling"]);
  }
}

function createDeity(beings: Lookup<Being>, theme: string): Being {
  const deity = beings.set({
    kind: "deity",
    names: createNames(theme, ["deity"]),
    role: randomChoice(config.deityRole),
    theme,
    relationships: {},
    needs: createDeityNeeds(),
    preferences: createDeityPreferences(),
    timesChosen: Object.fromEntries(
      Object.entries(createDeityPreferences()).map(([key]) => [key, 0])
    ) as Preferences,
    holding: [],
    availableActions: [],
    activities: [],
  });
  initialBeingActions(deity);
  return deity;
}

// Other stuff to maybe incorporate.

// One deity could encompass an entire category?

// Relationships horizontal:
// Lover
// Partner (husband/wife etc)
// Sibling
// Enemy?
// Friend?
// Peer?

// Relationships vertical:
// Children
// Banner bearer
// Herald
// Apprentice
// Follower
// Servant

// Plants:
// fungus
// fruit
// weed
// herb
// grass
// flowers

// pathos
// logos
// ethos

// Sin:
// envy
// hate
// lust
// greed
// gluttony
// pride
// sloth

// Virtue:
// kindness
// patience
// chastity
// charity
// temperance
// humility
// diligence

// {
//   name: "youth",
//   categories: ["stages_of_life"],
//   tags: ["middle"],
// },
// {
//   name: "adult",
//   categories: ["stages_of_life"],
//   tags: ["middle"],
// },
