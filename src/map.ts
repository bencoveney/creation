import { getPlayerChar, Player } from "./player.js";

export enum CellType {
  Empty,
  Base,
}

export type EmptyCell = {
  kind: CellType.Empty;
};

export type BaseCell = {
  kind: CellType.Base;
  player: Player;
};

export type Cell = EmptyCell | BaseCell;

export type World = {
  xSize: number;
  ySize: number;
  // [x][y]
  cells: Cell[][];
};

export function createWorld(xSize: number, ySize: number): World {
  return {
    xSize: xSize,
    ySize: ySize,
    cells: new Array<Cell[]>(xSize)
      .fill(undefined as any)
      .map((_) => new Array<EmptyCell>(ySize).fill({ kind: CellType.Empty })),
  };
}

function getCellContent(cell: Cell) {
  switch (cell.kind) {
    case CellType.Empty:
      return " ";
    case CellType.Base:
      return getPlayerChar(cell.player);
  }
}

export function writeWorld({ xSize, ySize, cells }: World) {
  console.log("  +" + "-+".repeat(xSize));
  for (let y = ySize - 1; y >= 0; y--) {
    let row = `${y} |`;
    for (let x = 0; x < xSize; x++) {
      row += getCellContent(cells[x][y]);
      row += "|";
    }
    console.log(row);
    console.log("  +" + "-+".repeat(xSize));
  }
  let row = `   `;
  for (let x = 0; x < xSize; x++) {
    row += `${x} `;
  }
  console.log(row);
}

export function enumerateCells(map: World): Cell[] {
  return map.cells.flatMap((row) => row);
}

export function getCell(x: number, y: number, map: World): Cell {
  return map.cells[x][y];
}

export function setCell(x: number, y: number, map: World, newCell: Cell) {
  map.cells[x][y] = newCell;
}
