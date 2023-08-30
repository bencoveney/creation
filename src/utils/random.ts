export function randomChoice<T>(items: T[]): T {
  return items[randomInt(0, items.length)];
}

export function randomChoices<T>(items: T[], nChoices: number) {
  if (nChoices >= items.length) {
    throw new Error("Probably a mistake");
  }
  const result = [randomChoice(items)];
  if (nChoices > 0) {
    result.push(
      ...randomChoices(
        items.filter((next) => next !== result[0]),
        nChoices - 1
      )
    );
  }
  return result;
}

export function randomInt(minIncl: number = 0, maxExcl: number = 1) {
  return Math.floor(Math.random() * (maxExcl - minIncl) + minIncl);
}

export function flipCoin(): boolean {
  return rollDice(0.5);
}

export function rollDice(chanceOfSuccess: number): boolean {
  return Math.random() < chanceOfSuccess;
}

export function randomSelection<T>(items: T[]): () => T {
  let remainingItems = shuffle(items);
  return () => {
    const result = remainingItems.pop();
    if (!result) {
      throw new Error("Probably a mistake");
    }
    return result;
  };
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  let counter = result.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = result[counter];
    result[counter] = result[index];
    result[index] = temp;
  }

  return result;
}
