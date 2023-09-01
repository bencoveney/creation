import { Being, History } from ".";
import {
  flipCoin,
  randomChoice,
  randomChoices,
  randomInt,
  rollDice,
} from "../utils/random";
import { createDeity } from "./populate";

export type Theme = {
  name: string;
  categories: string[];
  tags: string[];
};

const themesByName = new Map<string, Theme>();
function populatethemesByName(history: History) {
  if (themesByName.size > 0) {
    return;
  }
  history.config.themes.forEach((theme) => {
    themesByName.set(theme.name, theme);
  });
}

const themesByCategory = new Map<string, Theme[]>();
function populateThemesByCategory(history: History) {
  if (themesByCategory.size > 0) {
    return;
  }
  history.config.themes.forEach((theme) => {
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
function populateThemesByTag(history: History) {
  if (themesByTag.size > 0) {
    return;
  }
  history.config.themes.forEach((theme) => {
    theme.tags.forEach((tag) => {
      if (!themesByTag.has(tag)) {
        themesByTag.set(tag, []);
      }
      const themes = themesByTag.get(tag)!;
      themes.push(theme);
    });
  });
}

export type DeityTheme = {
  theme: string;
  relationshipKind?: string;
  relationshipTo?: string[];
};

export function createInitialDeities(history: History) {
  const deityThemes = getDeityThemes(history);
  deityThemes.forEach((deityTheme) => {
    const deity = createDeity(history.beings, deityTheme.theme);
    history.log(`[[${deity.name}]] woke from their slumber.`);
  });
}

export function getDeityThemes(history: History): DeityTheme[] {
  populatethemesByName(history);
  populateThemesByCategory(history);
  populateThemesByTag(history);

  const selectedCategories = randomChoices(
    [...themesByCategory.keys()],
    randomInt(history.config.themeRange.min, history.config.themeRange.max)
  );
  const groups = selectedCategories.flatMap((category) => {
    const themes = themesByCategory.get(category)!;
    const isRelationship = rollDice(history.config.deityRelationshipChance);
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
    return randomChoice(["Partner", "Lover"]);
  } else {
    return randomChoice(["Sibling", "Friend"]);
  }
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