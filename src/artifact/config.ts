export type ArtifactMaterial = {
  name: string;
  sets: string[];
};
export type ArtifactMaterialReference =
  | {
      kind: "material";
      name: string;
    }
  | { kind: "set"; name: string };
export type ArtifactTemplate = {
  name: string;
  allowedMaterials: ArtifactMaterialReference[];
  // parts: ArtifactPartTemplate[];
};
// export type ArtifactPartTemplate = {
//   name: string;
//   required: boolean;
//   allowedMaterials: ArtifactMaterialReference[];
// };

export const artifactConfig = {
  items: [
    {
      name: "sword",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
      // Blade, guard, hilt, grip, pommel
    },
    {
      name: "shield",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "dagger",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "spear",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "cup",
      allowedMaterials: [{ kind: "set", name: "base_small" }],
      // parts: [],
    },
    {
      name: "bowl",
      allowedMaterials: [{ kind: "set", name: "base_small" }],
      // parts: [],
    },
    {
      name: "knife",
      allowedMaterials: [{ kind: "set", name: "base_small" }],
      // parts: [],
    },
    {
      name: "bracelet",
      allowedMaterials: [{ kind: "set", name: "ornament" }],
      // parts: [],
    },
    {
      name: "necklace",
      allowedMaterials: [{ kind: "set", name: "ornament" }],
      // parts: [],
    },
    {
      name: "gown",
      allowedMaterials: [{ kind: "set", name: "clothing" }],
      // parts: [],
    },
    {
      name: "robe",
      allowedMaterials: [{ kind: "set", name: "clothing" }],
      // parts: [],
    },
    {
      name: "club",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "scepter",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "vial",
      allowedMaterials: [{ kind: "set", name: "transparent" }],
      // parts: [],
    },
    {
      name: "hood",
      allowedMaterials: [{ kind: "set", name: "clothing" }],
      // parts: [],
    },
    {
      name: "veil",
      allowedMaterials: [{ kind: "set", name: "clothing" }],
      // parts: [],
    },
    {
      name: "scarf",
      allowedMaterials: [{ kind: "set", name: "clothing" }],
      // parts: [],
    },
    {
      name: "eyeglass",
      allowedMaterials: [{ kind: "set", name: "ornament" }],
      // parts: [],
    },
    {
      name: "map",
      allowedMaterials: [{ kind: "set", name: "canvas" }],
      // parts: [],
    },
    {
      name: "jewel",
      allowedMaterials: [{ kind: "set", name: "jewel" }],
      // parts: [],
    },
    {
      name: "drum",
      allowedMaterials: [{ kind: "set", name: "base_large" }],
      // parts: [],
    },
    {
      name: "horn",
      allowedMaterials: [{ kind: "set", name: "base_small" }],
      // parts: [],
    },
    {
      name: "bell",
      allowedMaterials: [{ kind: "set", name: "metal" }],
      // parts: [],
    },
    {
      name: "painting",
      allowedMaterials: [{ kind: "set", name: "paintable" }],
      // parts: [],
    },
    {
      name: "tapestry",
      allowedMaterials: [{ kind: "material", name: "cloth" }],
      // parts: [],
    },
    {
      name: "bag",
      allowedMaterials: [{ kind: "set", name: "carrier" }],
      // parts: [],
    },
  ] as ArtifactTemplate[],
  materials: [
    { name: "wood", sets: ["base_large", "base_small"] },
    { name: "paper", sets: ["paintable"] },
    { name: "canvas", sets: ["paintable", "carrier"] },
    { name: "leather", sets: ["clothing", "carrier"] },
    { name: "cloth", sets: ["canvas", "clothing", "carrier"] },
    { name: "silk", sets: ["clothing", "carrier"] },
    { name: "wool", sets: ["clothing"] },
    { name: "stone", sets: ["sculpt", "base_large", "base_small"] },
    {
      name: "gold",
      sets: ["sculpt", "base_large", "base_small", "ornament", "metal"],
    },
    {
      name: "silver",
      sets: ["sculpt", "base_large", "base_small", "ornament", "metal"],
    },
    { name: "bone", sets: ["sculpt", "ornament", "base_small"] },
    { name: "horn", sets: ["ornament", "base_small"] },
    { name: "iron", sets: ["sculpt", "base_large", "base_small", "metal"] },
    { name: "clay", sets: ["sculpt"] },
    { name: "ruby", sets: ["jewel", "transparent"] },
    { name: "diamond", sets: ["jewel", "transparent"] },
    { name: "emerald", sets: ["jewel", "transparent"] },
    { name: "sapphire", sets: ["jewel", "transparent"] },
    { name: "glass", sets: ["transparent"] },
  ] as ArtifactMaterial[],
};
