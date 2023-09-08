import { History } from "../worldgen";
import { Language } from "../worldgen/language";
import { getFromLookupSafe } from "../utils/lookup";
import { config } from "../config";
import { Region } from "./region";
import { getDeities } from "../worldgen/populate";
import { Being } from "./being";
import { Grid, GridItem } from "./grid";
import { array2dGet } from "../utils/array2d";
import { TerrainLayerPicker } from "./terrainLayerPicker";
import { TerrainValues } from "./terrainValues";
import { TileValues } from "./tileValues";
import { getTerrainLayer } from "../terrain/registry";
import { Terrain } from "./terrain";
import { getTile } from "../worldgen/world";

export function WorldSelection({
  history,
  language,
  selectionX,
  selectionY,
  setTerrainLayer,
  terrainLayer,
}: {
  history: History;
  language: Language;
  selectionX: number;
  selectionY: number;
  setTerrainLayer: (name: string) => void;
  terrainLayer: string;
}) {
  if (!history.world) {
    return null;
  }

  const selectedTile = getTile(history.world, selectionX, selectionY);
  const layer = getTerrainLayer(selectedTile.terrainRegistry, terrainLayer);

  return (
    <Grid columns={1}>
      <GridItem>
        <TerrainLayerPicker
          terrainRegistry={history.terrainRegistry}
          setTerrainLayer={setTerrainLayer}
        />
      </GridItem>
      <GridItem>
        <TerrainValues
          terrainRegistry={history.terrainRegistry}
          selectionX={selectionX}
          selectionY={selectionY}
        />
      </GridItem>
      <GridItem>
        <Terrain layer={layer} hoverX={null} hoverY={null} />
      </GridItem>
      <GridItem>
        <TileValues tile={selectedTile} />
        {selectedTile && <Region region={selectedTile} history={history} />}
      </GridItem>
      {selectedTile &&
        getDeities(history.beings)
          .filter((deity) => deity.location === selectedTile.id)
          .map((deity, index) => (
            <GridItem key={index}>
              <Being being={deity} history={history} language={language} />
            </GridItem>
          ))}
    </Grid>
  );
}
