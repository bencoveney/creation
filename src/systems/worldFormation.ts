import { config } from "../config";
import { History, commaSeparate } from "../worldgen";
import { getDeities } from "../worldgen/populate";
import { createWorld } from "../worldgen/world";

export function runWorldFormation(history: History) {
  const deities = getDeities(history.beings);
  if (history.regions.map.size >= 1 && !history.world) {
    const worldRegion = history.regions.map.values().next().value;
    history.world = createWorld(config.worldWidth, config.worldHeight);
    const inWorldDeities = deities.filter((d) => d.location === worldRegion.id);
    if (inWorldDeities.length > 0) {
      const inWorldDeityNames = commaSeparate(
        inWorldDeities.map((being) => `[[${being.name}]]`)
      );
      history.log(
        `the world of [[${worldRegion.name}]] was given form by ${inWorldDeityNames}`
      );
    } else {
      history.log(`the world of [[${worldRegion.name}]] was given form`);
    }
  }
}
