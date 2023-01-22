"use strict";
(() => {
  // src/hex.ts
  function hexAt(q, r, s) {
    if (typeof s === "number") {
      if (typeof s === "number" && q + r + s !== 0) {
        throw new Error("Invalid hex coordinates");
      }
      return [q, r, s];
    }
    return [q, r, -q - r];
  }
  function hexAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  }
  var hexDirections = [
    hexAt(1, 0, -1),
    hexAt(1, -1, 0),
    hexAt(0, -1, 1),
    hexAt(-1, 0, 1),
    hexAt(-1, 1, 0),
    hexAt(0, 1, -1)
  ];
  function hexMapCreate(halfSize, tileDataProvider, edgeDataProvider) {
    const fullSize = halfSize * 2 + 1;
    const coords = empty(fullSize).map((_, row) => {
      return empty(fullSize - Math.abs(halfSize - row)).map((_2, col) => {
        return hexMapLookupToCoords([col, row], halfSize);
      });
    });
    const rqLookup = coords.map(
      (row) => row.map((coord) => ({
        coords: coord,
        edges: [],
        neighbours: [],
        data: tileDataProvider(coord)
      }))
    );
    rqLookup.forEach(
      (row) => row.forEach((tile) => {
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
          tile.neighbours.push(neighbour);
          if (directionIndex <= 2) {
            tile.edges.push({
              data: edgeDataProvider(tile, neighbour),
              tiles: [tile, neighbour]
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
      rqLookup
    };
  }
  function hexMapCoordsToLookup([q, r], halfSize) {
    const row = r + halfSize;
    const adjustBy = r <= 0 ? r : 0;
    const column = halfSize + q + adjustBy;
    return [row, column];
  }
  function hexMapLookupToCoords([row, col], halfSize) {
    const rCoord = -(halfSize - col);
    const qCoord = rCoord < 0 ? -(halfSize - row) - rCoord : -(halfSize - row);
    return hexAt(qCoord, rCoord);
  }
  function empty(length) {
    return new Array(length).fill(void 0);
  }
  function hexMapRender(map2) {
    let render = "";
    const allTiles = map2.rqLookup.flat();
    const renderRows = [];
    for (let renderRow = -(map2.halfSize * 2); renderRow <= map2.halfSize * 2; renderRow++) {
      renderRows.push(
        allTiles.filter(({ coords }) => coords[1] - coords[2] == renderRow)
      );
    }
    for (let i = 0; i < renderRows.length; i++) {
      const tiles = renderRows[i];
      const renderRow = i - map2.halfSize * 2;
      const body = renderRow > -map2.halfSize - 1 && renderRow < map2.halfSize + 1;
      const inset = "        ";
      const insetRepeat = body ? renderRow % 2 == 0 ? 1 : 0 : Math.abs(renderRow) - map2.halfSize;
      const indent = inset.repeat(insetRepeat);
      const firstRow = i - 1 < 0;
      const lastRow = i + 1 >= renderRows.length;
      if (firstRow) {
        render += indent;
        render += "  ,-----,\n";
        render += indent;
        render += " /       \\\n";
      } else {
        const maxTiles = Math.max(tiles.length, renderRows[i - 1].length);
        const shrinking = tiles.length < renderRows[i - 1].length;
        if (!shrinking) {
          render += indent;
          render += empty(maxTiles).map((_) => " /       \\ ").join("     ");
        } else {
          render += inset.repeat(insetRepeat - 1);
          render += empty(maxTiles).map((_) => " \\       / ").join("     ");
        }
        render += "\n";
      }
      const tilesList = tiles.map(({ coords }) => {
        const tidyCoords = coords.map(
          (i2) => i2 < 0 ? i2.toString() : " " + i2.toString()
        );
        return `${tidyCoords[0]},${tidyCoords[1]},${tidyCoords[2]}${body ? "b" : "t"}`;
      }).join("}-----{");
      render += `${indent}{${tilesList}}
`;
      if (lastRow) {
        render += indent;
        render += " \\       /\n";
        render += indent;
        render += "  `-----'\n";
      }
    }
    console.log(render);
  }

  // src/player.ts
  function getPlayerChar(player) {
    return player.name[0];
  }

  // src/map.ts
  function createWorld(xSize, ySize) {
    return {
      xSize,
      ySize,
      cells: new Array(xSize).fill(void 0).map((_) => new Array(ySize).fill({ kind: 0 /* Empty */ }))
    };
  }
  function getCellContent(cell) {
    switch (cell.kind) {
      case 0 /* Empty */:
        return " ";
      case 1 /* Base */:
        return getPlayerChar(cell.player);
    }
  }
  function writeWorld({ xSize, ySize, cells }) {
    console.log("  +" + "-+".repeat(xSize));
    for (let y = ySize - 1; y >= 0; y--) {
      let row2 = `${y} |`;
      for (let x = 0; x < xSize; x++) {
        row2 += getCellContent(cells[x][y]);
        row2 += "|";
      }
      console.log(row2);
      console.log("  +" + "-+".repeat(xSize));
    }
    let row = `   `;
    for (let x = 0; x < xSize; x++) {
      row += `${x} `;
    }
    console.log(row);
  }
  function enumerateCells(map2) {
    return map2.cells.flatMap((row) => row);
  }
  function setCell(x, y, map2, newCell) {
    map2.cells[x][y] = newCell;
  }

  // src/index.ts
  var map = createWorld(5, 5);
  var players = [{ name: "Player" }, { name: "CPU" }];
  setCell(0, 0, map, { kind: 1 /* Base */, player: players[0] });
  setCell(map.xSize - 1, map.ySize - 1, map, {
    kind: 1 /* Base */,
    player: players[1]
  });
  function calculateScore(map2, player) {
    const cells = enumerateCells(map2);
    return cells.filter(
      (cell) => cell.kind == 1 /* Base */ && player == cell.player
    ).length;
  }
  function writeScore(map2) {
    console.log(
      players.map((player) => `${player.name}: ${calculateScore(map2, player)}`).join(" - ")
    );
  }
  window.addEventListener("load", async () => {
    console.clear();
    writeWorld(map);
    console.log();
    writeScore(map);
    console.log();
    const hexMap = hexMapCreate(
      3,
      () => ({}),
      () => ({})
    );
    hexMapRender(hexMap);
  });
})();
