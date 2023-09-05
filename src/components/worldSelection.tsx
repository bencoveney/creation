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

  const selectedTile = array2dGet(
    history.world,
    Math.floor(selectionX / config.terrainResolution),
    Math.floor(selectionY / config.terrainResolution)
  );
  const selectedRegion =
    selectedTile && getFromLookupSafe(history.regions, selectedTile.location);
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
        {selectedRegion && <Region region={selectedRegion} history={history} />}
      </GridItem>
      {selectedRegion &&
        getDeities(history.beings)
          .filter((deity) => deity.location === selectedRegion.id)
          .map((deity, index) => (
            <GridItem key={index}>
              <Being being={deity} history={history} language={language} />
            </GridItem>
          ))}
    </Grid>
  );
}
