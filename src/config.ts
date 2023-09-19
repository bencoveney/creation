export const config = {
  runTicks: 75,
  preRegisterWords: ["the", "of"],
  artifactItems: [
    "sword",
    "shield",
    "dagger",
    "spear",
    "cup",
    "bowl",
    "knife",
    "bracelet",
    "necklace",
    "chain",
    "rope",
    "gown",
    "robe",
    "club",
    "scepter",
    "vial",
    "hood",
    "veil",
    "necklace",
    "eyeglass",
    "map",
    "drum",
    "horn",
    "bell",
  ],
  themes: [
    {
      name: "sun",
      categories: ["celestial"],
      tags: ["daylight"],
    },
    {
      name: "moon",
      categories: ["celestial"],
      tags: ["nightlight"],
    },
    {
      name: "stars",
      categories: ["celestial"],
      tags: ["nightlight"],
    },
    {
      name: "create",
      categories: ["stages_of_creations"],
      tags: ["beginning"],
    },
    {
      name: "preserve",
      categories: ["stages_of_creations"],
      tags: ["middle"],
    },
    {
      name: "destroy",
      categories: ["stages_of_creations"],
      tags: ["end"],
    },
    {
      name: "earth",
      categories: ["elements"],
      tags: ["land"],
    },
    { name: "air", categories: ["elements"], tags: ["sky", "gas"] },
    { name: "water", categories: ["elements"], tags: ["liquid"] },
    {
      name: "fire",
      categories: ["elements"],
      tags: ["forge", "temperature"],
    },
    {
      name: "ice",
      categories: ["elements"],
      tags: ["temperature", "cold"],
    },
    { name: "metal", categories: ["elements"], tags: [] },
    { name: "destiny", categories: ["fate"], tags: [] },
    { name: "chance", categories: ["fate"], tags: [] },
    { name: "desire", categories: ["fate"], tags: [] },
    {
      name: "life",
      categories: ["stages_of_life"],
      tags: ["beginning"],
    },
    { name: "death", categories: ["stages_of_life"], tags: ["end"] },
    { name: "war", categories: ["diplomacy"], tags: [] },
    { name: "peace", categories: ["diplomacy"], tags: [] },
    { name: "mercy", categories: ["judgement"], tags: [] },
    {
      name: "revenge",
      categories: ["judgement"],
      tags: [],
    },
    { name: "law", categories: ["judgement"], tags: [] },
    { name: "forgive", categories: ["judgement"], tags: [] },
    { name: "grief", categories: ["emotions"], tags: [] },
    { name: "joy", categories: ["emotions"], tags: [] },
    { name: "dream", categories: ["mental_states"], tags: [] },
    { name: "madness", categories: ["mental_states"], tags: [] },
    { name: "thought", categories: ["mental_states"], tags: [] },
    { name: "lucid", categories: ["mental_states"], tags: [] },
    { name: "heal", categories: ["medical"], tags: ["beginning"] },
    { name: "wound", categories: ["medical"], tags: ["end"] },
    {
      name: "animals",
      categories: ["living_beings"],
      tags: ["land"],
    },
    { name: "fish", categories: ["living_beings"], tags: ["liquid"] },
    { name: "bird", categories: ["living_beings"], tags: ["sky"] },
    { name: "plant", categories: ["living_beings"], tags: ["land"] },
    { name: "cloud", categories: ["weather"], tags: ["sky"] },
    { name: "wind", categories: ["weather"], tags: ["sky", "gas"] },
    {
      name: "rain",
      categories: ["weather"],
      tags: ["sky", "liquid"],
    },
    { name: "thunder", categories: ["weather"], tags: ["sky"] },
    { name: "lightning", categories: ["weather"], tags: ["sky"] },
    { name: "snow", categories: ["weather"], tags: ["sky", "cold"] },
    {
      name: "sunshine",
      categories: ["weather"],
      tags: ["sky", "daylight"],
    },
  ],
  themeRange: {
    min: 3,
    max: 5,
  },
  motifs: [
    { name: "cross", unicode: "✚" },
    { name: "triangle", unicode: "▲" },
    { name: "circle", unicode: "●" },
    { name: "square", unicode: "◼" },
    { name: "star", unicode: "⛦" },
    { name: "ring", unicode: "⌾" },
    { name: "arrowhead", unicode: "➤" },
    { name: "diamond", unicode: "♦" },
    { name: "cresent", unicode: "◠" },
    { name: "semicircle", unicode: "◖" },
    { name: "bar", unicode: "❙" },
  ],
  deityRelationshipChance: 0.75,
  deityHoldingLimit: 3,
  movementChance: 0.2,
  worldWidth: 10,
  worldHeight: 10,
  terrainResolution: 20,
  waterHeight: 0.46,
  waterStop1: 0.25,
  waterStop2: 0.35,
  regionPlaces: [
    "woods",
    "halls",
    "cliffs",
    "forest",
    "plains",
    "tundras",
    "mountains",
    "streets",
  ],
  regionAdjectives: [
    "windy",
    "calm",
    "frozen",
    "windswept",
    "sunny",
    "tranquil",
    "undead",
    "barren",
  ],
  settlementNameStarts: [
    "ply",
    "exe",
    "tor",
    "paign",
    "ex",
    "barn",
    "ton",
    "tiver",
    "brix",
    "bide",
    "teign",
    "sid",
    "dawl",
    "tavi",
    "north",
    "ivy",
  ],
  settlementNameEnds: [
    "mouth",
    "ter",
    "quay",
    "ton",
    "staple",
    "ton abbot",
    "ham",
    "ford",
    "ish",
    "stock",
    "bridge",
  ],
};
