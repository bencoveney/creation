import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { Terrain } from "./terrain";
import { createTerrain } from "../terrain";
import { getFromLookupSafe, lookupValues } from "../utils/lookup";
import { config } from "../config";
import { useHoverPosition } from "../hooks/useHover";

const terrain = createTerrain(config.worldWidth, config.worldHeight);

export function Map({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  const renderWidth = 800;
  const renderHeight = 800;
  const [handler, x, y] = useHoverPosition();
  const tileX =
    x === null
      ? null
      : Math.floor(
          Math.min(x, renderWidth - 1) / (renderWidth / history.world?.width!)
        );
  const tileY =
    y === null
      ? null
      : Math.floor(
          Math.min(y, renderHeight - 1) /
            (renderHeight / history.world?.height!)
        );
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${renderWidth / history.world?.width!}px `.repeat(
          history.world?.width!
        ),
        gridTemplateRows: `${renderHeight / history.world?.height!}px `.repeat(
          history.world?.height!
        ),
        maxHeight: renderHeight,
        maxWidth: renderWidth,
        height: renderHeight,
        width: renderWidth,
      }}
      onMouseMove={handler}
    >
      {history.world?.cells.map((cell, index) => {
        const region = getFromLookupSafe(history.regions, cell.location);
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
            {lookupValues(history.beings)
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
        <Terrain terrain={terrain} hoverX={tileX} hoverY={tileY} />
      </div>
    </div>
  );
}
