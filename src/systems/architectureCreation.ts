import { Being, History, Region } from "../history";
import { Lookup, getFromLookup, lookupValues } from "../history/lookup";
import {
  updateArchitectureCreatedTileActions,
  updateBeingActions,
} from "../decision/factories";
import { Tile } from "../world";
import {
  CreateArchitectureActivity,
  completeActivity,
  forEachBeingByActivity,
  getCurrentActivity,
} from "../decision/activity";
import { commaSeparate } from "../utils/string";
import { randomChoice } from "../utils/random";
import { config } from "../config";
import { createNames } from "../language/names";

export function runArchitectureCreation(history: History) {
  forEachBeingByActivity(history, "createArchitecture", createArchitecture);
}

export function architectureFactory(
  regions: Lookup<Region>,
  parent: Region,
  being: Being
): Region {
  const kind = randomChoice(config.deityArchitecture);
  const architecture = regions.set({
    names: createNames(being.theme!, [kind]),
    discovered: true,
    parent,
  });
  return architecture;
}

function createArchitecture(
  history: History,
  being: Being,
  activity: CreateArchitectureActivity
) {
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.names.defaultKey}]] started creating architecture in [[${tile.names.defaultKey}]]`,
      [being.id],
      [tile.id],
      []
    );
    activity.timeLeft = Math.round(Math.random() * 10);
  } else {
    activity.timeLeft--;
    if (activity.timeLeft >= 0) {
      return;
    }
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
    const architecture = architectureFactory(history.regions, tile, being);
    const beingIds: string[] = [];
    const beingNames: string[] = [];
    allBeings.forEach((participant) => {
      completeActivity(participant);
      updateBeingActions(participant);
      beingNames.push(`[[${participant.names.defaultKey}]]`);
      beingIds.push(participant.id);
    });
    history.log(
      `${commaSeparate(beingNames)} created [[${
        architecture.names.defaultKey
      }]] in [[${tile.names.defaultKey}]]`,
      beingIds,
      [tile.id, architecture.id],
      []
    );
    updateArchitectureCreatedTileActions(history, tile);
  }
}
