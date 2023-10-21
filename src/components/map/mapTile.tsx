import { History } from "../../history";
import { lookupValues } from "../../history/lookup";
import { Tile } from "../../world";
import { Name } from "./../name";
import { Tooltip } from "./../layout/tooltip";
import { Motif } from "./../motif";
import { PropsWithChildren } from "react";

export function MapTile({ tile, history }: { tile: Tile; history: History }) {
  if (!tile.discovered) {
    return null;
  }
  const beings = lookupValues(history.beings).filter(
    (being) => being.location === tile.id
  );
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 10,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        lineHeight: 2,
      }}
    >
      <BlackLabel>
        <Name languageName={"ID"} word={tile.id} />
      </BlackLabel>
      <br />
      {beings.length ? (
        <BlackLabel>
          {beings.map((being, index) => (
            <Tooltip key={index} label={being.id}>
              <Motif motif={being.motif} />
            </Tooltip>
          ))}
        </BlackLabel>
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
  );
}

function BlackLabel({ children }: PropsWithChildren) {
  return (
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
      {children}
    </span>
  );
}
