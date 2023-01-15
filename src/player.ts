export type Player = {
  name: string;
};

export function getPlayerChar(player: Player) {
  return player.name[0];
}
