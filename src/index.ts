import { hexMapCreate, hexMapRender } from "./hex.js";
import {
  CellType,
  createWorld,
  enumerateCells,
  setCell,
  World,
  writeWorld,
} from "./map.js";
import { Player } from "./player.js";

const map = createWorld(5, 5);

const players: Player[] = [{ name: "Player" }, { name: "CPU" }];

setCell(0, 0, map, { kind: CellType.Base, player: players[0] });
setCell(map.xSize - 1, map.ySize - 1, map, {
  kind: CellType.Base,
  player: players[1],
});

function calculateScore(map: World, player: Player) {
  const cells = enumerateCells(map);
  return cells.filter(
    (cell) => cell.kind == CellType.Base && player == cell.player
  ).length;
}

function writeScore(map: World) {
  console.log(
    players
      .map((player) => `${player.name}: ${calculateScore(map, player)}`)
      .join(" - ")
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
