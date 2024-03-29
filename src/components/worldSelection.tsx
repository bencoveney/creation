import { Region } from "./region";
import { Grid, GridItem } from "./layout/grid";
import { TerrainLayerPicker } from "./terrainLayerPicker";
import { TerrainValues } from "./terrainValues";
import { TileValues } from "./tileValues";
import { getTerrainLayer } from "../terrain/registry";
import { Terrain } from "./map/terrain";
import { getTile } from "../world";
import { InspectProps } from "../hooks/useInspect";
import { lookupValues } from "../history/lookup";
import { BeingSummary } from "./beingSummary";
import { useHistory } from "./historyContext";

export function WorldSelection({
  selectionX,
  selectionY,
  setTerrainLayer,
  terrainLayer,
  inspect,
}: {
  selectionX: number;
  selectionY: number;
  setTerrainLayer: (name: string) => void;
  terrainLayer: string;
} & InspectProps) {
  const history = useHistory();
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
      </GridItem>
      <GridItem>
        <Region region={selectedTile} inspect={inspect} />
      </GridItem>
      {selectedTile &&
        lookupValues(history.beings)
          .filter((being) => being.location === selectedTile.id)
          .map((being, index) => (
            <GridItem key={index}>
              <BeingSummary being={being} inspect={inspect} />
            </GridItem>
          ))}
    </Grid>
  );
}
