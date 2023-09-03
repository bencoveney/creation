import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { Terrain } from "./terrain";
import { createTerrain } from "../terrain";
import { getFromLookupSafe, lookupValues } from "../utils/lookup";
import { config } from "../config";
import { useHoverPosition } from "../hooks/useHover";
import { Tile, getTile } from "../worldgen/world";
import { Name } from "./name";
import { Tooltip } from "./tooltip";
import { Motif } from "./motif";
import { Region } from "./region";
import { getDeities } from "../worldgen/populate";
import { Being } from "./being";
import { Grid, GridItem } from "./grid";

const terrain = createTerrain(config.worldWidth, config.worldHeight);

export function Map({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  if (!history.world) {
    return null;
  }
  const renderWidth = 900;
  const renderHeight = 900;
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
  const flipTileY = tileY === null ? null : terrain.height - tileY - 1;
  const selectedTile =
    tileX !== null && flipTileY !== null
      ? getTile(history.world, tileX, flipTileY)
      : null;
  const selectedRegion =
    selectedTile && getFromLookupSafe(history.regions, selectedTile.location);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${
            renderWidth / history.world?.width!
          }px `.repeat(history.world?.width!),
          gridTemplateRows: `${
            renderHeight / history.world?.height!
          }px `.repeat(history.world?.height!),
          maxHeight: renderHeight,
          maxWidth: renderWidth,
          height: renderHeight,
          width: renderWidth,
        }}
        onMouseMove={handler}
      >
        {history.world.cells.map((cell, index) => {
          return (
            <MapTile
              key={index}
              tile={cell}
              gridRow={history.world?.height! - cell.y}
              gridColumn={(index % history.world?.width!) + 1}
              history={history}
              language={language}
            />
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
          <Terrain terrain={terrain} hoverX={tileX} hoverY={flipTileY} />
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Grid title={`Tile summary ${tileX} ${flipTileY}`} columns={1}>
          {selectedRegion && (
            <>
              <GridItem>
                <Region region={selectedRegion} history={history} />
              </GridItem>
              {getDeities(history.beings)
                .filter((deity) => deity.location === selectedRegion.id)
                .map((deity, index) => (
                  <GridItem key={index}>
                    <Being being={deity} history={history} />
                  </GridItem>
                ))}
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}

function MapTile({
  tile,
  gridRow,
  gridColumn,
  history,
  language,
}: {
  tile: Tile;
  gridRow: number;
  gridColumn: number;
  history: History;
  language: Language;
}) {
  const region = getFromLookupSafe(history.regions, tile.location);
  const languageName = spellWords(getWords(language.name, language));
  const beings = lookupValues(history.beings).filter(
    (being) => being.location === tile.location && being.motif
  );
  return (
    <div
      style={{
        gridRow,
        gridColumn,
        aspectRatio: 1,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {region?.name && (
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            fontFamily: "sans-serif",
            fontWeight: "bold",
            lineHeight: 2,
          }}
        >
          <span
            style={{
              backgroundColor: "black",
              color: "white",
              boxDecorationBreak: "clone",
              borderRadius: 6,
              padding: "6px 6px",
            }}
          >
            <Name
              languageName={languageName}
              word={spellWords(getWords(region.name, language))}
            />
          </span>
          <br />
          {beings.length ? (
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                lineHeight: 1.4,
                boxDecorationBreak: "clone",
                borderRadius: 6,
                padding: "6px 6px",
              }}
            >
              {beings.map((being, index) => (
                <Tooltip
                  key={index}
                  label={spellWords(getWords(being.name, language))}
                >
                  <Motif motif={being.motif} history={history} />
                </Tooltip>
              ))}
            </span>
          ) : (
            <span
              style={{
                lineHeight: 1.4,
              }}
            >
              {"\u00A0"}
            </span>
          )}
        </div>
      )}
      {}
    </div>
  );
}
