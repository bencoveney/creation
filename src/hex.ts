/*
  Axes (Q, R, S) And Neighbours (0...5):

             ,-----,
         +S /       \ -R
     ,-----{    2    }-----,
    /       \       /       \
   {    3    }-----{    1    }
    \       /       \       /
  -Q }-----{         }-----{ +Q
    /       \       /       \
   {    4    }-----{    0    }
    \       /       \       /
     `-----{    5    }-----`
         +R \       / -S
             `-----`

  https://www.redblobgames.com/grids/hexagons/implementation.html
*/

// Avoid interacting with this directly.
// S is derived from Q and R.
type HexCoords = Readonly<
  [
    number, // q
    number, // r
    number // s
  ]
>;

export function hexAt(q: number, r: number, s: number): HexCoords;
export function hexAt(q: number, r: number): HexCoords;
export function hexAt(q: number, r: number, s?: number): HexCoords {
  if (typeof s === "number") {
    if (typeof s === "number" && q + r + s !== 0) {
      throw new Error("Invalid hex coordinates");
    }
    return [q, r, s];
  }
  return [q, r, -q - r];
}
export function hexEquals(a: HexCoords, b: HexCoords): boolean {
  return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
}
export function hexAdd(a: HexCoords, b: HexCoords): HexCoords {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
export function hexSubtract(a: HexCoords, b: HexCoords): HexCoords {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
export function hexMultiply(a: HexCoords, b: HexCoords): HexCoords {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}
export function hexLength(hex: HexCoords): number {
  return Math.floor(
    (Math.abs(hex[0]) + Math.abs(hex[1]) + Math.abs(hex[2])) / 2
  );
}
export function hexDistance(a: HexCoords, b: HexCoords): number {
  return hexLength(hexSubtract(a, b));
}
export const hexDirections: HexCoords[] = [
  hexAt(1, 0, -1),
  hexAt(1, -1, 0),
  hexAt(0, -1, 1),
  hexAt(-1, 0, 1),
  hexAt(-1, 1, 0),
  hexAt(0, 1, -1),
];
export function hexDirection(direction: number) {
  return hexDirections[direction];
}
export function hexNeighbour(hex: HexCoords, direction: number) {
  return hexAdd(hex, hexDirection(direction));
}
export function hexNeighbours(hex: HexCoords) {
  return hexDirections.map((direction) => hexAdd(hex, direction));
}

// Some effort made to make things readonly.
// Really users should only be touching tile/edge data after map creation.

export type HexMap<TileData, EdgeData> = {
  readonly halfSize: number;
  readonly fullSize: number;
  readonly rqLookup: ReadonlyArray<
    ReadonlyArray<HexMapTile<TileData, EdgeData>>
  >;
  readonly midpoint: HexMapTile<TileData, EdgeData>;
};
export type HexMapTile<TileData, EdgeData> = {
  readonly coords: HexCoords;
  readonly neighbours: ReadonlyArray<HexMapTile<TileData, EdgeData>>; // Redundant but maybe useful.
  readonly edges: ReadonlyArray<HexMapEdge<TileData, EdgeData>>;
  data: TileData;
};
export type HexMapEdge<TileData, EdgeData> = {
  readonly tiles: [
    HexMapTile<TileData, EdgeData>,
    HexMapTile<TileData, EdgeData>
  ];
  data: EdgeData;
};

export type HexMapTileDataProvider<TileData> = (coords: HexCoords) => TileData;
export type HexMapEdgeDataProvider<TileData, EdgeData> = (
  aCoords: HexMapTile<TileData, EdgeData>,
  bCoords: HexMapTile<TileData, EdgeData>
) => EdgeData;

/**
 * Creates a hexagonal map extending in +/- size in all directions.
 */
export function hexMapCreate<TileData, EdgeData>(
  halfSize: number,
  tileDataProvider: HexMapTileDataProvider<TileData>,
  edgeDataProvider: HexMapEdgeDataProvider<TileData, EdgeData>
): HexMap<TileData, EdgeData> {
  const fullSize = halfSize * 2 + 1;
  const coords: HexCoords[][] = empty(fullSize).map((_, row) => {
    return empty(fullSize - Math.abs(halfSize - row)).map((_, col) => {
      return hexMapLookupToCoords([col, row], halfSize);
    });
  });
  const rqLookup: HexMapTile<TileData, EdgeData>[][] = coords.map((row) =>
    row.map((coord) => ({
      coords: coord,
      edges: [],
      neighbours: [],
      data: tileDataProvider(coord),
    }))
  );
  // Now that we have all tiles, we can populate edges and neighbours. To do
  // this we have to touch some properties that would normally be readonly.
  rqLookup.forEach((row) =>
    row.forEach((tile) => {
      hexDirections.forEach((direction, directionIndex) => {
        const possibleNeighbour = hexAdd(tile.coords, direction);
        const neighbourLookup = hexMapCoordsToLookup(
          possibleNeighbour,
          halfSize
        );
        const neighbour = rqLookup[neighbourLookup[0]]?.[neighbourLookup[1]];
        if (!neighbour) {
          return;
        }
        (tile.neighbours as HexMapTile<TileData, EdgeData>[]).push(neighbour);
        if (directionIndex <= 2) {
          (tile.edges as HexMapEdge<TileData, EdgeData>[]).push({
            data: edgeDataProvider(tile, neighbour),
            tiles: [tile, neighbour],
          });
        }
      });
    })
  );
  const midpointLookup = hexMapCoordsToLookup([0, 0, 0], halfSize);
  const midpoint = rqLookup[midpointLookup[0]]?.[midpointLookup[1]];
  return {
    halfSize,
    fullSize,
    midpoint,
    rqLookup,
  };
}
export function hexMapHas<TileData, EdgeData>(
  map: HexMap<TileData, EdgeData>,
  hex: HexCoords
) {
  return !!hexMapGet(map, hex);
}
export function hexMapGet<TileData, EdgeData>(
  map: HexMap<TileData, EdgeData>,
  hex: HexCoords
): HexMapTile<TileData, EdgeData> | undefined {
  const lookup = hexMapCoordsToLookup(hex, map.halfSize);
  return map.rqLookup[lookup[0]]?.[lookup[1]];
}
export function hexMapGetOrThrow<TileData, EdgeData>(
  map: HexMap<TileData, EdgeData>,
  hex: HexCoords
) {
  const found = hexMapGet(map, hex);
  if (!found) {
    throw new Error("Could not find tile");
  }
  return found;
}

/*
  For compactness, hex tiles are stored in an array of arrays, where:
  - the first level of arrays (the "rows") are each cells R component.
  - the second level of arrays (the columns) are each cells Q component.

  The diagram for a halfSize 2 map hopefully explains a bit better. It /is/ a
  hexagon, just slanted.

  r=-2:                   ( 0,-2), ( 1,-2), ( 2,-2)
  r=-1:          (-1,-1), ( 0,-1), ( 1,-1), ( 2,-1)
  r= 0: (-2, 0), (-1, 0), ( 0, 0), ( 1, 0), ( 2, 0)
  r= 1: (-2, 1), (-1, 1), ( 0, 1), ( 1, 1)
  r= 2: (-2, 2), (-1, 2), ( 0, 2)
        q=-2:    q=-1:    q=0:     q=1:     q=2:

  While the rows and columns are neat when laid out like above, they are less
  orderly when properly packed. In particular, the Q values for each row follow
  different patterns above and below the midpoint.

  This diagram shows the row/column indices we need to generate.
  
                  (0, 0), (0, 1), (0, 2)
          (1, 0), (1, 1), (1, 2), (1, 3)
  (2, 0), (2, 1), (2, 2), (2, 3), (2, 4)
  (3, 0), (3, 1), (3, 2), (3, 3)
  (4, 0), (4, 1), (4, 2)

  The same thing happens in reverse when trying to derive the row/column
  indices given a cell's q/r coordinates.
  
  As a result, there are some lookup functions provided, and those lookup
  functions have some janky midpoint checks.

  In the future, it might be simpler to use a different tile storage scheme,
  which could allow for things like arbitrary map shapes/sizes. For any
  alternative we'd need to consider:
  - Are the lookups quick (assuming that's important)?
  - Is being able to access rows in a specific order (e.g. for rendering)?

  If speed is important, we should be doing all the allocations that the
  current implementation does anyway. Maybe accept individual q, r, s values?

  Now that this is implemented, it seems fine for now...
*/

type HexMapLookup = [number, number];
function hexMapCoordsToLookup(
  [q, r]: HexCoords,
  halfSize: number
): HexMapLookup {
  const row = r + halfSize;
  const adjustBy = r <= 0 ? r : 0;
  const column = halfSize + q + adjustBy;
  return [row, column];
}
function hexMapLookupToCoords(
  [row, col]: HexMapLookup,
  halfSize: number
): HexCoords {
  const rCoord = -(halfSize - col);
  const qCoord = rCoord < 0 ? -(halfSize - row) - rCoord : -(halfSize - row);
  return hexAt(qCoord, rCoord);
}

// TODO: use utils (and maybe vecs) (and consider migrating some hex stuff).
export function empty(length: number): undefined[] {
  return new Array(length).fill(undefined);
}
