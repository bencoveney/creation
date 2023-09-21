import { getFromLookup } from "../history/lookup";
import {
  CurrentConversationActivity,
  History,
  getBeingsByActivity,
} from "../history";

export function runConversation(history: History) {
  const beings = getBeingsByActivity(history.beings, "conversation");
  beings.forEach((being) => {
    const activity = being.currentActivity as CurrentConversationActivity;
    const target = getFromLookup(history.beings, activity.target);
    const location = getFromLookup(history.regions, being.location!);
    being.currentActivity = undefined;
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
  });
}
