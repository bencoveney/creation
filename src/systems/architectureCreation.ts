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

export function runArchitectureCreation(history: History) {
  forEachBeingByActivity(history, "createArchitecture", createArchitecture);
}

export function architectureFactory(
  regions: Lookup<Region>,
  parent: Region
): Region {
  const kind = randomChoice(config.deityArchitecture);
  const architecture = regions.set({
    name: architectureNameFactory(kind),
    discovered: true,
    parent,
  });
  return architecture;
}

let architectureNameCount = 0;
function architectureNameFactory(kind: string): string {
  return `architecture_${kind}_${architectureNameCount++}`;
}

function createArchitecture(
  history: History,
  being: Being,
  activity: CreateArchitectureActivity
) {
  const tile = getFromLookup(history.regions, being.location!) as Tile;
  if (activity.timeLeft === undefined) {
    history.log(
      `[[${being.name}]] started creating architecture in [[${tile.name}]]`,
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
    const architecture = architectureFactory(history.regions, tile);
    const beingIds: string[] = [];
    const beingNames: string[] = [];
    allBeings.forEach((participant) => {
      completeActivity(participant);
      updateBeingActions(participant);
      beingNames.push(`[[${participant.name}]]`);
      beingIds.push(participant.id);
    });
    history.log(
      `${commaSeparate(beingNames)} created [[${architecture.name}]] in [[${
        tile.name
      }]]`,
      beingIds,
      [tile.id, architecture.id],
      []
    );
    updateArchitectureCreatedTileActions(history, tile);
  }
}