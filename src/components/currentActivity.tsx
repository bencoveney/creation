import { CurrentActivity } from "../state/history";

export function CurrentActivity({
  currentActivity,
}: {
  currentActivity: CurrentActivity;
}) {
  return <div>Current Activity: {currentActivity.kind}</div>;
}
