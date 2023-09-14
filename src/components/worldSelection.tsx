import { History } from "../state/history";
import { Language } from "../state/language/language";
import { Region } from "./region";
import { getDeities } from "../worldgen/populate";
import { Being } from "./being";
import { Grid, GridItem } from "./layout/grid";
import { TerrainLayerPicker } from "./terrainLayerPicker";
import { TerrainValues } from "./terrainValues";
import { TileValues } from "./tileValues";
import { getTerrainLayer } from "../state/terrain/registry";
import { Terrain } from "./map/terrain";
import { getTile } from "../worldgen/world";
import { InspectProps } from "../hooks/useInspect";

export function WorldSelection({
  history,
  language,
  selectionX,
  selectionY,
  setTerrainLayer,
  terrainLayer,
  inspect,
}: {
  history: History;
  language: Language;
  selectionX: number;
  selectionY: number;
  setTerrainLayer: (name: string) => void;
  terrainLayer: string;
} & InspectProps) {
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
              <Being
                being={deity}
                history={history}
                language={language}
                inspect={inspect}
              />
            </GridItem>
          ))}
    </Grid>
  );
}
