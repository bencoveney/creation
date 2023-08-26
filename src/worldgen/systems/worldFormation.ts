import { History, commaSeparate } from "..";
import { randomChoice } from "../../utils/random";
import { createTileRegion, getDeities } from "../populate";
import { createWorld as createWorld2 } from "../world";

export function runWorldFormation(history: History) {
  const deities = getDeities(history.beings);
  if (history.regions.map.size >= 1 && !history.world) {
    const worldRegion = history.regions.map.values().next().value;
    history.world = createWorld2(
      history.config.worldWidth,
      history.config.worldHeight
    );
    const inWorldDeities = deities.filter((d) => d.location === worldRegion.id);
    if (inWorldDeities.length > 0) {
      const inWorldDeityNames = commaSeparate(
        inWorldDeities.map((being) => `[[${being.name}]]`)
      );
      history.log.log(
        `the world of [[${worldRegion.name}]] was given form by ${inWorldDeityNames}`
      );
    } else {
      history.log.log(`the world of [[${worldRegion.name}]] was given form`);
    }
  } else if (history.world) {
    const unformed = history.world?.cells.filter((cell) => !cell.location);
    if (!unformed.length) {
      return;
    }
    const target = randomChoice(unformed);
    const region = createTileRegion(history.regions, target);
    const regionNameParts = region.name
      .split(" ")
      .map((part) => `[[${part}]]`)
      .join(" ");
    history.log.log(`the region ${regionNameParts} was formed`);
    target.location = region.id;
  }
}
