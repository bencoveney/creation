import { History, Region } from "../history/index";
import { updateInitialTileActions } from "../decision/factories";
import { TerrainAssessment, assessTerrain } from "../terrain/assess";
import { TerrainRegistry, sliceTerrainRegistry } from "../terrain/registry";
import { NeedsId } from "../history/lookup";
import { createRegionName } from "../language/factories";
import { Array2d, array2dCreate, array2dGet } from "../utils/array2d";
import { config } from "../config";

export type Tile = {
  x: number;
  y: number;
  terrainRegistry: TerrainRegistry;
  terrainAssessment: TerrainAssessment;
} & Region;

export type World = Array2d<Tile>;

export function createWorld(
  history: History,
  width: number,
  height: number
): World {
  return array2dCreate(width, height, (x, y) => {
    const newTerrainRegistry = sliceTerrainRegistry(
      history.terrainRegistry,
      x,
      y,
      config.terrainResolution
    );
    const tile = history.regions.set({
      x,
      y,
      location: "",
      terrainRegistry: newTerrainRegistry,
      terrainAssessment: assessTerrain(newTerrainRegistry),
      discovered: false,
      name: createRegionName(),
    } as NeedsId<Tile>) as Tile;
    updateInitialTileActions(history, tile);
    return tile;
  });
}

export function getTile(world: World, x: number, y: number): Tile {
  return array2dGet(
    world,
    Math.floor(x / config.terrainResolution),
    Math.floor(y / config.terrainResolution)
  );
}
