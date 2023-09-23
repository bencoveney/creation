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
  completeActivity(being);
  if (target.location !== being.location) {
    console.warn("conversationFailed");
    return;
  }
  history.log(
    `[[${being.name}]] talked to [[${target.name}]]`,
    [being.id, target.id],
    [location.id],
    []
  );
  if (being.relationships[target.id]) {
    being.relationships[target.id].encounters++;
  } else {
    being.relationships[target.id] = {
      kind: "met",
      encounters: 1,
    };
  }
}
