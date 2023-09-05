import { TerrainRegistry } from "../terrain/registry";
import { Tags, TagsItem } from "./tags";

export function TerrainLayerPicker({
  terrainRegistry,
  setTerrainLayer,
}: {
  terrainRegistry: TerrainRegistry;
  setTerrainLayer: (layer: string) => void;
}) {
  return (
    <>
      <div>Terrain layer</div>
      {terrainRegistry.map((entry) => (
        <button key={entry.name} onClick={() => setTerrainLayer(entry.name)}>
          {entry.name}
        </button>
      ))}
    </>
  );
}
