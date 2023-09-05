import { toHex } from "@bencoveney/utils/dist/color";
import { TerrainRegistry } from "../terrain/registry";
import { array2dGet } from "../utils/array2d";
import { round } from "../utils/maths";

export function TerrainValues({
  terrainRegistry,
  selectionX,
  selectionY,
}: {
  terrainRegistry: TerrainRegistry;
  selectionX: number;
  selectionY: number;
}) {
  return terrainRegistry.map((entry) => {
    switch (entry.kind) {
      case "color":
        const color = array2dGet(entry.values, selectionX, selectionY);
        const hex = toHex(color);
        return (
          <div key={entry.name}>
            {entry.name}
            {": "}
            <span style={{ backgroundColor: hex }}>{hex}</span>
          </div>
        );
      case "number":
        return (
          <div key={entry.name}>
            {entry.name}
            {": "}
            {round(array2dGet(entry.values, selectionX, selectionY), 3)}
          </div>
        );
      case "string":
        return (
          <div key={entry.name}>
            {entry.name}
            {": "}
            {array2dGet(entry.values, selectionX, selectionY)}
          </div>
        );
    }
  });
}
