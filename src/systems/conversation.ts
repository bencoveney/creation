import { getFromLookup } from "../history/lookup";
import { Being, History } from "../history";
import {
  ConversationActivity,
  completeActivity,
  forEachBeingByActivity,
} from "../decision/activity";

export function runConversation(history: History) {
  forEachBeingByActivity(history, "conversation", conversation);
}

function conversation(
  history: History,
  being: Being,
  activity: ConversationActivity
) {
  const target = getFromLookup(history.beings, activity.target);
  const location = getFromLookup(history.regions, being.location!);
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.name}]] started talking to [[${target.name}]]`,
      [being.id, target.id],
      [location.id],
      []
    );
    activity.timeLeft = Math.round(Math.random() * 10);
  } else {
    activity.timeLeft--;
    if (activity.timeLeft >= 0) {
      return;
    }
    history.log(
      `[[${being.name}]] finished talking to [[${target.name}]]`,
      [being.id, target.id],
      [location.id],
      []
    );
    completeActivity(being);
    completeActivity(target);
    if (being.relationships[target.id]) {
      being.relationships[target.id].encounters++;
    } else {
      being.relationships[target.id] = {
        kind: "met",
        encounters: 1,
      };
    }
  }
}
