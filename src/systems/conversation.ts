import { getFromLookup, lookupValues } from "../history/lookup";
import { Being, History } from "../history";
import {
  ConversationActivity,
  completeActivity,
  forEachBeingByActivity,
  getCurrentActivity,
} from "../decision/activity";
import {
  updateConversationFinishedTileActions,
  updateConversationStartedTileActions,
} from "../decision/factories";
import { Tile } from "../world";
import { commaSeparate } from "../utils/string";

export function runConversation(history: History) {
  forEachBeingByActivity(history, "conversation", conversation);
}

function conversation(
  history: History,
  being: Being,
  activity: ConversationActivity
) {
  const target = getFromLookup(history.beings, activity.target);
  const location = getFromLookup(history.regions, being.location!) as Tile;
  const otherBeings = lookupValues(history.beings).filter((other) => {
    const otherActivity = getCurrentActivity(other);
    if (
      otherActivity?.kind === "joined" &&
      otherActivity.activity === activity
    ) {
      return true;
    }
    return false;
  });
  const allBeings = [being, ...otherBeings.map((other) => other)];
  const beingIds: string[] = allBeings.map((participant) => participant.id);
  const beingNames: string[] = allBeings.map(
    (participant) => `[[${participant.names.defaultKey}]]`
  );
  if (activity.timeLeft === undefined) {
    history.log(
      `${commaSeparate(beingNames)} started a conversation in [[${
        location.names.defaultKey
      }]]`,
      beingIds,
      [location.id],
      []
    );
    activity.timeLeft = Math.round(Math.random() * 10);
    updateConversationStartedTileActions(history, location, being);
  } else {
    activity.timeLeft--;
    if (activity.timeLeft >= 0) {
      return;
    }
    allBeings.forEach((participant) => {
      completeActivity(participant);
    });
    history.log(
      `${commaSeparate(beingNames)} finished their conversation in [[${
        location.names.defaultKey
      }]]`,
      beingIds,
      [location.id],
      []
    );
    updateConversationFinishedTileActions(history, location, being);
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
