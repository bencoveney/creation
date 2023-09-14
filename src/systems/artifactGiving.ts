import { getDeitiesByActivity } from "../worldgen/populate";
import { CurrentGiveArtifactActivity, History } from "../state/history";
import { getFromLookup } from "../state/history/lookup";
import { Tile } from "../worldgen/world";

export function runArtifactGiving(history: History) {
  const deities = getDeitiesByActivity(history.beings, "giveArtifact");
  deities.forEach((deity) => {
    const activity = deity.currentActivity as CurrentGiveArtifactActivity;
    const artifact = getFromLookup(history.artifacts, activity.artifact);
    const tile = getFromLookup(history.regions, deity.location!) as Tile;
    const target = getFromLookup(history.beings, activity.target);
    history.log(
      `[[${deity.name}]] gifted the ${artifact.object} [[${artifact.name}]] to [[${target.name}]]`,
      [deity.id, target.id],
      [tile.id],
      [artifact.id]
    );
    // deity.holding.push(artifact.id);
    deity.holding.splice(deity.holding.indexOf(artifact.id), 1);
    target.holding.push(artifact.id);
    deity.currentActivity = undefined;
  });
}