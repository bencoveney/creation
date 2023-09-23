import { HasActivities, getCurrentActivity } from "../decision/activity";

export function Activities({
  hasActivities,
}: {
  hasActivities: HasActivities;
}) {
  return (
    <div>
      Current Activity: {getCurrentActivity(hasActivities)?.kind || "none"}
    </div>
  );
}
