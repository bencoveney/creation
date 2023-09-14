import { History, Region } from "../state/history/index";
import { config } from "../config";
import { updateInitialTileActions } from "../state/decision/factories";
import { TerrainAssessment, assessTerrain } from "../state/terrain/assess";
import {
  TerrainRegistry,
  sliceTerrainRegistry,
} from "../state/terrain/registry";
import {
  Array2d,
  array2dCreate,
  array2dGet,
  array2dIsInBounds,
} from "../utils/array2d";
import { NeedsId } from "../state/history/lookup";
import { createRegionName } from "../state/language";

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

export function getNeighbouringTiles(world: World, tile: Tile): Tile[] {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
    .map(([dx, dy]) => [tile.x + dx, tile.y + dy])
    .filter(([x, y]) => array2dIsInBounds(world, x, y))
    .map(([x, y]) => array2dGet(world, x, y));
}

export function pathfind(world: World, from: Tile, to: Tile): Tile[] {
  const fromInfo: PathFindingTileInfo = {
    cameFrom: undefined,
    cost: 0,
    priority: heuristic(from, to),
  };

  const tilesIKnowAbout = new Map<Tile, PathFindingTileInfo>();
  tilesIKnowAbout.set(from, fromInfo);

  const tilesIShouldCheck = new Map<Tile, PathFindingTileInfo>();
  tilesIShouldCheck.set(from, fromInfo);

  let routeFound = false;
  let sanityCheck = 0;
  while (
    !routeFound &&
    tilesIShouldCheck.size > 0 &&
    sanityCheck++ < world.values.length
  ) {
    const [next, nextInfo] = getNextPossibleTile(tilesIShouldCheck);
    tilesIShouldCheck.delete(next);
    if (next === to) {
      const route = [];
      let stop: Tile | undefined = next;
      while (stop) {
        route.unshift(stop);
        stop = tilesIKnowAbout.get(stop)?.cameFrom;
      }
      return route;
    } else {
      const neighbours = getNeighbouringTiles(world, next);
      neighbours.forEach((neighbour) => {
        const cost = nextInfo.cost + 1;
        const priority = cost + heuristic(neighbour, to);
        const known = tilesIKnowAbout.get(neighbour);
        if (known !== undefined && cost >= known.cost) {
          return;
        }
        const neighbourInfo = { cost, cameFrom: next, priority };
        tilesIKnowAbout.set(neighbour, neighbourInfo);
        tilesIShouldCheck.set(neighbour, neighbourInfo);
      });
    }
  }

  throw new Error("Couldn't find path");
}

type PathFindingTileInfo = {
  cameFrom: Tile | undefined;
  cost: number;
  priority: number;
};
type PathFindingTiles = Map<Tile, PathFindingTileInfo>;
function getNextPossibleTile(tiles: PathFindingTiles) {
  const possibilities = [...tiles.entries()];
  const sorted = possibilities.sort((a, b) => a[1].priority - b[1].priority);
  return sorted[0];
}

function heuristic(from: Tile, to: Tile): number {
  return euclidianDistance(from, to);
}

export function manhattanDistance(from: Tile, to: Tile): number {
  const deltaX = Math.abs(from.x - to.x);
  const deltaY = Math.abs(from.y - to.y);
  return deltaX + deltaY;
}

export function euclidianDistance(from: Tile, to: Tile): number {
  const deltaX = Math.abs(from.x - to.x);
  const deltaY = Math.abs(from.y - to.y);
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export function getTile(world: World, x: number, y: number): Tile {
  return array2dGet(
    world,
    Math.floor(x / config.terrainResolution),
    Math.floor(y / config.terrainResolution)
  );
}
