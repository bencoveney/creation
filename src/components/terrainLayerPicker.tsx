import { TerrainRegistry } from "../state/terrain/registry";

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
