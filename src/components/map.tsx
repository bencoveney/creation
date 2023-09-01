import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { Terrain } from "./terrain";
import { createTerrain } from "../terrain";

const terrain = createTerrain(5, 5);

export function Map({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr ".repeat(history.world?.width!),
        gridTemplateRows: "1fr ".repeat(history.world?.height!),
        gridGap: 10,
        maxHeight: 800,
        maxWidth: 800,
      }}
    >
      {history.world?.cells.map((cell, index) => {
        const region = history.regions.map.get(cell.location);
        return (
          <div
            key={index}
            style={{
              gridRow: history.world?.height! - cell.y,
              gridColumn: (index % history.world?.width!) + 1,
              aspectRatio: 1,
              zIndex: 1,
            }}
          >
            <span>{region?.name!}</span>
            <div>
              {region?.name && spellWords(getWords(region.name, language))}
            </div>
            <div>
              ({cell.x}, {cell.y})
            </div>
            {...[...history.beings.map.values()]
              .filter((being) => being.location === cell.location)
              .map((being, index) => (
                <div key={index}>
                  {spellWords(getWords(being.name, language))}
                </div>
              ))}
          </div>
        );
      })}
      <div
        style={{
          gridRowStart: 1,
          gridRowEnd: -1,
          gridColumnStart: 1,
          gridColumnEnd: -1,
          aspectRatio: 1,
          zIndex: 0,
        }}
      >
        <Terrain terrain={terrain} />
        {/* {renderTerrain(terrain)
      .split("\n")
      .map((row, index) => (
        <div key={index}>{row}</div>
      ))} */}
      </div>
    </div>
  );
}
