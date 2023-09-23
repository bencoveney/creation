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

export type HasNeeds = {
  needs: Needs;
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
    drainRate: Math.random() * 0.1,
  };
}

export function satisfyNeed(hasNeeds: HasNeeds, satisfies: keyof Needs) {
  hasNeeds.needs[satisfies].currentValue = 0.5 + Math.random() * 0.5;
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
