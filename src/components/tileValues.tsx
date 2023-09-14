import { round } from "../utils/maths";
import { Tile } from "../state/world";

export function TileValues({ tile }: { tile: Tile }) {
  return (
    <>
      <div>
        Tile Position: ({tile.x}, {tile.y})
      </div>
      {Object.entries(tile.terrainAssessment).map(([key, value]) => (
        <div key={key}>
          {key}: {stringify(value)}
        </div>
      ))}
    </>
  );
}

function stringify(value: any): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return round(value, 3).toString();
  } else if (Array.isArray(value)) {
    return value.map((i) => stringify(i)).join(", ");
  } else {
    return JSON.stringify(value);
  }
}
