import { Action } from "./action";

export type Preferences = Record<Action["action"], number>;

export function createPreferences(): Preferences {
  return {
    discover: Math.random(),
    rest: Math.random(),
    travel: Math.random(),
    createArtifact: Math.random(),
    createArchitecture: Math.random(),
    adoptSymbol: Math.random(),
    conversation: Math.random(),
    giveArtifact: Math.random(),
  };
}

export function createStrongPreference() {
  return Math.random() * 0.5 + 0.5;
}

export function createWeakPreference() {
  return Math.random() * 0.5;
}
