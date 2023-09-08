export type Need = {
  currentValue: number;
  drainRate: number;
};

export type Needs = {
  socialise: Need;
  create: Need;
  rest: Need;
  explore: Need;
};

export function createNeeds(): Needs {
  return {
    socialise: createNeed(),
    create: createNeed(),
    rest: createNeed(),
    explore: createNeed(),
  };
}

export function createNeed(): Need {
  return {
    currentValue: Math.random(),
    drainRate: Math.random(),
  };
}

export function updateNeeds(needs: Needs) {
  updateNeed(needs.socialise);
  updateNeed(needs.create);
  updateNeed(needs.rest);
  updateNeed(needs.explore);
}

export function updateNeed(need: Need) {
  need.currentValue = Math.max(0, need.currentValue - need.drainRate);
}
