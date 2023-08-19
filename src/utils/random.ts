export function randomChoice<T>(items: T[]): T {
  return items[randomInt(0, items.length)];
}

export function randomInt(minIncl: number = 0, maxExcl: number = 1) {
  return Math.floor(Math.random() * (maxExcl - minIncl) + minIncl);
}

export function flipCoin(): boolean {
  return Math.random() >= 0.5;
}
