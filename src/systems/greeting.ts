import { getFromLookup } from "../utils/lookup";
import { History } from "../worldgen";
import { getDeities } from "../worldgen/populate";

export function runGreeting(history: History) {
  const deities = getDeities(history.beings);
  const locationIds = Array.from(
    new Set(
      deities
        .map((deity) => deity.location)
        .filter<string>((location): location is string => !!location)
        .filter(
          (location) =>
            getFromLookup(history.regions, location)?.name !== "world_0"
        )
    )
  );
  locationIds.forEach((locationId) => {
    const deitiesAtLocation = deities.filter(
      (deity) => deity.location === locationId
    );
    deitiesAtLocation.forEach((deity) => {
      deitiesAtLocation
        .filter((other) => other.id !== deity.id)
        .forEach((other) => {
          if (deity.relationships[other.id]) {
            deity.relationships[other.id].encounters++;
          } else {
            deity.relationships[other.id] = {
              kind: "acquaintance",
              encounters: 1,
            };
          }
        });
    });
  });
}
