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

export function WorldSelection({
  history,
  language,
  selectionX,
  selectionY,
  setTerrainLayer,
}: {
  history: History;
  language: Language;
  selectionX: number;
  selectionY: number;
  setTerrainLayer: (name: string) => void;
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

  return (
    <Grid columns={1}>
      <GridItem>
        <div>
          Terrain Position: ({selectionX}, {selectionY})
        </div>
        <div>
          Tile Position: ({selectedTile.x}, {selectedTile.y})
        </div>
        <TerrainValues
          terrainRegistry={history.terrainRegistry}
          selectionX={selectionX}
          selectionY={selectionY}
        />
      </GridItem>
      <GridItem>
        <TerrainLayerPicker
          terrainRegistry={history.terrainRegistry}
          setTerrainLayer={setTerrainLayer}
        />
      </GridItem>
      {selectedRegion && (
        <>
          <GridItem>
            <Region region={selectedRegion} history={history} />
          </GridItem>
          {getDeities(history.beings)
            .filter((deity) => deity.location === selectedRegion.id)
            .map((deity, index) => (
              <GridItem key={index}>
                <Being being={deity} history={history} language={language} />
              </GridItem>
            ))}
        </>
      )}
    </Grid>
  );
}
