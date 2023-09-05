import { round } from "../utils/maths";
import { Tile } from "../worldgen/world";

export function TileValues({ tile }: { tile: Tile }) {
  return (
    <>
      <div>
        Tile Position: ({tile.x}, {tile.y})
      </div>
      {Object.entries(tile.terrainAssessment).map(([key, value]) => (
        <div key={key}>
          {key}: {round(value as number, 3)}
        </div>
      ))}
    </>
  );
}
