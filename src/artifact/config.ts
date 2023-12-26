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
  parts: ArtifactPartTemplate[];
};
export type ArtifactPartTemplate = {
  name: string;
  required: boolean;
  allowedMaterials: ArtifactMaterialReference[];
  parts: ArtifactPartTemplate[];
};

export type ArtifactPart = {
  name: string;
  material: string;
  parts: ArtifactPart[];
};

const bladedWeaponParts: ArtifactPartTemplate[] = [
  {
    name: "blade",
    required: true,
    allowedMaterials: [{ kind: "set", name: "metal" }],
    parts: [],
  },
  {
    name: "hilt",
    required: true,
    allowedMaterials: [{ kind: "set", name: "metal" }],
    parts: [
      {
        name: "grip",
        required: false,
        allowedMaterials: [{ kind: "material", name: "leather" }],
        parts: [],
      },
      {
        name: "guard",
        required: false,
        allowedMaterials: [{ kind: "set", name: "metal" }],
        parts: [],
      },
      {
        name: "pommel",
        required: false,
        allowedMaterials: [
          { kind: "set", name: "metal" },
          { kind: "set", name: "jewel" },
        ],
        parts: [],
      },
    ],
  },
];

const poleWeaponParts: ArtifactPartTemplate[] = [
  {
    name: "pole",
    required: true,
    allowedMaterials: [{ kind: "material", name: "wood" }],
    parts: [],
  },
  {
    name: "head",
    required: true,
    allowedMaterials: [{ kind: "set", name: "metal" }],
    parts: [],
  },
];

const tablewareParts: ArtifactPartTemplate[] = [
  {
    name: "body",
    required: true,
    allowedMaterials: [{ kind: "set", name: "base_small" }],
    parts: [],
  },
];

const jewelleryParts: ArtifactPartTemplate[] = [
  {
    name: "body",
    required: true,
    allowedMaterials: [{ kind: "set", name: "ornament" }],
    parts: [],
  },
];

const clothingParts: ArtifactPartTemplate[] = [
  {
    name: "fabric",
    required: true,
    allowedMaterials: [{ kind: "set", name: "clothing" }],
    parts: [],
  },
];

export const artifactConfig = {
  items: [
    {
      name: "shield",
      parts: [
        {
          name: "body",
          required: true,
          allowedMaterials: [{ kind: "material", name: "wood" }],
          parts: [
            {
              name: "buckler",
              required: false,
              allowedMaterials: [{ kind: "set", name: "metal" }],
              parts: [],
            },
            {
              name: "rim",
              required: false,
              allowedMaterials: [{ kind: "set", name: "metal" }],
              parts: [],
            },
            {
              name: "strap", // or grip
              required: false,
              allowedMaterials: [{ kind: "material", name: "leather" }],
              parts: [],
            },
          ],
        },
      ],
    },
    {
      name: "sword",
      parts: bladedWeaponParts,
    },
    {
      name: "dagger",
      parts: bladedWeaponParts,
    },
    {
      name: "spear",
      parts: poleWeaponParts,
    },
    {
      name: "trident",
      parts: poleWeaponParts,
    },
    {
      name: "club",
      parts: poleWeaponParts,
    },
    {
      name: "scepter",
      parts: poleWeaponParts,
    },
    {
      name: "cup",
      parts: tablewareParts,
    },
    {
      name: "bowl",
      parts: tablewareParts,
    },
    {
      name: "jug",
      parts: tablewareParts,
    },
    {
      name: "knife",
      parts: bladedWeaponParts,
    },
    {
      name: "bracelet",
      parts: jewelleryParts,
    },
    {
      name: "necklace",
      parts: jewelleryParts,
    },
    {
      name: "earring",
      parts: jewelleryParts,
    },
    {
      name: "brooch",
      parts: jewelleryParts,
    },
    {
      name: "gown",
      parts: clothingParts,
    },
    {
      name: "robe",
      parts: clothingParts,
    },
    {
      name: "hood",
      parts: clothingParts,
    },
    {
      name: "veil",
      parts: clothingParts,
    },
    {
      name: "scarf",
      parts: clothingParts,
    },
    // {
    //   name: "eyeglass",
    //   allowedMaterials: [{ kind: "set", name: "ornament" }],
    //   // parts: [],
    // },
    // {
    //   name: "map",
    //   allowedMaterials: [{ kind: "set", name: "canvas" }],
    //   // parts: [],
    // },
    // {
    //   name: "vial",
    //   allowedMaterials: [{ kind: "set", name: "transparent" }],
    //   // parts: [],
    // },
    // {
    //   name: "jewel",
    //   allowedMaterials: [{ kind: "set", name: "jewel" }],
    //   // parts: [],
    // },
    // {
    //   name: "drum",
    //   allowedMaterials: [{ kind: "set", name: "base_large" }],
    //   // parts: [],
    // },
    // {
    //   name: "horn",
    //   allowedMaterials: [{ kind: "set", name: "base_small" }],
    //   // parts: [],
    // },
    // {
    //   name: "bell",
    //   allowedMaterials: [{ kind: "set", name: "metal" }],
    //   // parts: [],
    // },
    // {
    //   name: "painting",
    //   allowedMaterials: [{ kind: "set", name: "paintable" }],
    //   // parts: [],
    // },
    // {
    //   name: "tapestry",
    //   allowedMaterials: [{ kind: "material", name: "cloth" }],
    //   // parts: [],
    // },
    // {
    //   name: "bag",
    //   allowedMaterials: [{ kind: "set", name: "carrier" }],
    //   // parts: [],
    // },
  ] as ArtifactTemplate[],
  materials: [
    { name: "wood", sets: ["base_large", "base_small"] },
    { name: "paper", sets: ["paintable"] },
    { name: "canvas", sets: ["paintable", "carrier"] },
    { name: "leather", sets: ["carrier"] },
    { name: "cloth", sets: ["canvas", "clothing", "carrier"] },
    { name: "silk", sets: ["clothing", "carrier"] },
    { name: "lace", sets: ["clothing"] },
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

// axe, pike/javelin
// bone, flint, obsidian, copper, bronze, iron, or steel
