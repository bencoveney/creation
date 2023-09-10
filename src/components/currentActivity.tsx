import { CurrentActivity } from "../worldgen";

export function CurrentActivity({
  currentActivity,
}: {
  currentActivity: CurrentActivity;
}) {
  return <div>Current Activity: {currentActivity.kind}</div>;
}
