import { hexMapCreate } from "./hex.js";
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

enum Choice {
  Expand,
  Consolidate,
  Fight,
}

async function getChoice(): Promise<Choice> {
  console.log(`Options:
1: Expand
2: Consolidate
3: Fight`);
  process.stdout.write("> ");
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      const result = parseInt(data.toString().trim());
      switch (result) {
        case 1:
          resolve(Choice.Expand);
          return;
        case 2:
          resolve(Choice.Consolidate);
          return;
        case 3:
          resolve(Choice.Fight);
          return;
        default:
          console.log(`Unknown value ${data}, please enter 1, 2 or 3`);
          resolve(getChoice());
          return;
      }
    });
  });
}

console.clear();
writeWorld(map);
console.log();
writeScore(map);
console.log();
const choice = await getChoice();
console.log(Choice[choice]);

// TODO: Integrate properly
const hexMap = hexMapCreate(
  5,
  () => ({}),
  () => ({})
);
console.log(hexMap);

process.exit();
