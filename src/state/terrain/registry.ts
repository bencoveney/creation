import { Color } from "@bencoveney/utils/dist/color";
import { Array2d, array2dSlice } from "../../utils/array2d";

export type TerrainRegistryNumberEntry = {
  name: string;
  kind: "number";
  values: Array2d<number>;
};
export type TerrainRegistryColorEntry = {
  name: string;
  kind: "color";
  values: Array2d<Color>;
};
export type TerrainColorMap = { [key: string]: Color };
export type TerrainRegistryStringEntry = {
  name: string;
  kind: "string";
  values: Array2d<string>;
  colorMap: TerrainColorMap;
};
export type TerrainRegistryEntry =
  | TerrainRegistryNumberEntry
  | TerrainRegistryColorEntry
  | TerrainRegistryStringEntry;

export type TerrainRegistry = TerrainRegistryEntry[];

export function getTerrainLayer(
  terrainRegistry: TerrainRegistry,
  layerName: string
): TerrainRegistryEntry {
  const result = terrainRegistry.find((layer) => layer.name === layerName);
  if (!result) {
    throw new Error(`Bad layer name ${layerName}`);
  }
  return result;
}

export function sliceTerrainRegistry(
  terrainRegistry: TerrainRegistry,
  x: number,
  y: number,
  resolution: number
) {
  const xTerrain = x * resolution;
  const yTerrain = y * resolution;
  const newTerrainRegistry: TerrainRegistry = terrainRegistry.map((entry) => ({
    ...entry,
    values: array2dSlice<any>(
      entry.values,
      xTerrain,
      yTerrain,
      resolution,
      resolution
    ),
  }));
  return newTerrainRegistry;
}
