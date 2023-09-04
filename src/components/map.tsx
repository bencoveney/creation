import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { Terrain } from "./terrain";
import { createTerrain } from "../terrain";
import { getFromLookupSafe, lookupValues } from "../utils/lookup";
import { config } from "../config";
import { useHoverPosition } from "../hooks/useHover";
import { Tile } from "../worldgen/world";
import { Name } from "./name";
import { Tooltip } from "./tooltip";
import { Motif } from "./motif";
import { Region } from "./region";
import { getDeities } from "../worldgen/populate";
import { Being } from "./being";
import { Grid, GridItem } from "./grid";
import { array2dGet, array2dGetIndex } from "../utils/array2d";

const terrain = createTerrain(
  config.worldWidth * config.terrainResolution,
  config.worldHeight * config.terrainResolution
);

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
  const pixelX =
    x === null
      ? 0
      : Math.floor(
          Math.min(x, renderWidth - 1) / (renderWidth / terrain.xSize)
        );
  const pixelY =
    y === null
      ? null
      : Math.floor(
          Math.min(y, renderHeight - 1) / (renderHeight / terrain.ySize)
        );
  const flipPixelY = pixelY === null ? 0 : terrain.ySize - pixelY - 1;

  const selectedTile = array2dGet(
    history.world,
    Math.floor(pixelX / config.terrainResolution),
    Math.floor(flipPixelY / config.terrainResolution)
  );
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
            renderWidth / history.world?.xSize!
          }px `.repeat(history.world?.xSize!),
          gridTemplateRows: `${renderHeight / history.world?.ySize!}px `.repeat(
            history.world?.ySize!
          ),
          maxHeight: renderHeight,
          maxWidth: renderWidth,
          height: renderHeight,
          width: renderWidth,
        }}
        onMouseMove={handler}
      >
        {history.world.values.map((tile, index) => {
          return (
            <MapTile
              key={index}
              tile={tile}
              gridRow={history.world?.ySize! - tile.y}
              gridColumn={(index % history.world?.xSize!) + 1}
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
          <Terrain terrain={terrain} hoverX={pixelX} hoverY={flipPixelY} />
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Grid title={`Terrain Summary (${pixelX}, ${flipPixelY})`} columns={1}>
          {selectedRegion && (
            <>
              <GridItem>
                Height:{" "}
                {terrain.values[array2dGetIndex(terrain, pixelX, flipPixelY)]}
              </GridItem>
            </>
          )}
        </Grid>
        <Grid
          title={`Tile summary (${selectedTile.x}, ${selectedTile.y})`}
          columns={1}
        >
          {selectedRegion && (
            <>
              <GridItem>
                <Region region={selectedRegion} history={history} />
              </GridItem>
              {getDeities(history.beings)
                .filter((deity) => deity.location === selectedRegion.id)
                .map((deity, index) => (
                  <GridItem key={index}>
                    <Being
                      being={deity}
                      history={history}
                      language={language}
                    />
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
    (being) => being.location === tile.location
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
                  <Motif motif={being.motif} />
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
