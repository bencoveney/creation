import { getFromLookup } from "../state/history/lookup";
import { CurrentConversationActivity, History } from "../state/history";
import { getDeitiesByActivity } from "../worldgen/populate";

export function runConversation(history: History) {
  const deities = getDeitiesByActivity(history.beings, "conversation");
  deities.forEach((deity) => {
    const activity = deity.currentActivity as CurrentConversationActivity;
    const target = getFromLookup(history.beings, activity.target);
    const location = getFromLookup(history.regions, deity.location!);
    deity.currentActivity = undefined;
    if (target.location !== deity.location) {
      console.warn("conversationFailed");
      return;
    }
    history.log(
      `[[${deity.name}]] talked to [[${target.name}]]`,
      [deity.id, target.id],
      [location.id],
      []
    );
    if (deity.relationships[target.id]) {
      deity.relationships[target.id].encounters++;
    } else {
      deity.relationships[target.id] = {
        kind: "met",
        encounters: 1,
      };
    }
  });
}
