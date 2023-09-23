import { Coordinate, Being, Artifact, History } from "../history";
import { lookupValues } from "../history/lookup";
import { last } from "../utils/array";
import { HasNeeds, Needs, satisfyNeed } from "./need";

export type BaseActivity = {
  kind: string;
  interruptable: boolean;
  satisfies: keyof Needs;
};

export type Interruptable = {
  interruptable: true;
};

export type NotInterruptable = {
  interruptable: false;
};

export type TakesTime = {
  timeLeft?: number;
};

export type MovementActivity = {
  kind: "movement";
  moveToLocation: Coordinate;
  path: Coordinate[];
} & BaseActivity &
  NotInterruptable;
export type CreateArtifactActivity = {
  kind: "createArtifact";
} & BaseActivity &
  Interruptable &
  TakesTime;
export type RestActivity = {
  kind: "rest";
} & BaseActivity &
  Interruptable &
  TakesTime;
export type GiveArtifactActivity = {
  kind: "giveArtifact";
  target: Being["id"];
  artifact: Artifact["id"];
} & BaseActivity &
  NotInterruptable;
export type AdoptSymbolActivity = {
  kind: "adoptSymbol";
} & BaseActivity &
  Interruptable &
  TakesTime;
export type ConversationActivity = {
  kind: "conversation";
  target: Being["id"];
  // timeLeft?: number; // TODO
} & BaseActivity &
  Interruptable;

export type Activity =
  | MovementActivity
  | CreateArtifactActivity
  | GiveArtifactActivity
  | AdoptSymbolActivity
  | ConversationActivity
  | RestActivity;

export type HasActivities = {
  activities: Activity[];
};

export function getCurrentActivity(
  hasActivities: HasActivities
): Activity | undefined {
  return last(hasActivities.activities);
}

export function setCurrentActivity(
  hasActivities: HasActivities,
  activity: Activity
) {
  hasActivities.activities.push(activity);
}

export function canBeInterruped(hasActivities: HasActivities) {
  const currentActivity = getCurrentActivity(hasActivities);
  return !currentActivity || currentActivity.interruptable;
}

export function hasNoActivity(hasActivities: HasActivities) {
  return hasActivities.activities.length === 0;
}

export function completeActivity(being: HasActivities & HasNeeds) {
  if (being.activities.length <= 0) {
    throw new Error("Cannot complete missing activity");
  }
  const completed = being.activities.pop()!;
  satisfyNeed(being, completed?.satisfies);
}

type GetActivityByKind<T extends Activity["kind"]> = Activity & {
  kind: T;
};

export function forEachBeingByActivity<
  T extends Activity["kind"],
  U = GetActivityByKind<T>
>(
  history: History,
  kind: T,
  handler: (history: History, being: Being, activity: U) => void
) {
  const allBeings = lookupValues(history.beings);
  for (let beingIndex = 0; beingIndex < allBeings.length; beingIndex++) {
    const being = allBeings[beingIndex];
    const activity = getCurrentActivity(being);
    if (activity && activity?.kind === kind) {
      handler(history, being, activity as U);
    }
  }
}
