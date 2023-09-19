import { Artifact, Being, Dialect, History, Region } from ".";
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
  updateBeingActions,
} from "../decision/factories";
import { Preferences } from "../decision/preference";
import { createDeityName, createWorldName } from "../language";
import { generateLanguage } from "../language/language";
import { createWorld } from "../world";
import { Lookup, createLookup } from "./lookup";
import { createLogger } from "../log";
import { createTerrain } from "../terrain";
import { TerrainRegistry } from "../terrain/registry";

export function initialiseHistory() {
  const newHistory = initHistory();
  populateWorld(newHistory);
  return newHistory;
}

export function initHistory(): History {
  const terrainRegistry: TerrainRegistry = [];
  createTerrain(
    config.worldWidth * config.terrainResolution,
    config.worldHeight * config.terrainResolution,
    terrainRegistry
  );
  return {
    regions: createLookup<Region>(),
    beings: createLookup<Being>(),
    dialects: createLookup<Dialect>(),
    artifacts: createLookup<Artifact>(),
    log: createLogger(0),
    tick: 0,
    world: null,
    terrainRegistry,
    availableActions: [],
  };
}

export function populateWorld(history: History): void {
  history.dialects.set({
    language: generateLanguage(history),
  });
  createWorldRegion(history.regions);
  createInitialDeities(history);
  if (history.regions.map.size >= 1 && !history.world) {
    history.world = createWorld(history, config.worldWidth, config.worldHeight);
  }
}

export function createWorldRegion(regions: Lookup<Region>): Region {
  return regions.set({
    name: createWorldName(),
    discovered: true,
  });
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
      `[[${deity.name}]] woke from their slumber.`,
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
    name: createDeityName(),
    theme,
    relationships: {},
    needs: createDeityNeeds(),
    preferences: createDeityPreferences(),
    timesChosen: Object.fromEntries(
      Object.entries(createDeityPreferences()).map(([key]) => [key, 0])
    ) as Preferences,
    holding: [],
    availableActions: [],
  });
  updateBeingActions(deity);
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

// Activities:
// craft
// build
// mine
// weave
// hunt
// cook
// dance
// song
// fight

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
