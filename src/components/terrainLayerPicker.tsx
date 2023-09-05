import { TerrainRegistry } from "../terrain/registry";
import { Tags, TagsItem } from "./tags";

export function TerrainLayerPicker({
  terrainRegistry,
}: {
  terrainRegistry: TerrainRegistry;
}) {
  return (
    <Tags>
      {terrainRegistry.map((entry) => (
        <TagsItem key={entry.name}>{entry.name}</TagsItem>
      ))}
    </Tags>
  );
}
