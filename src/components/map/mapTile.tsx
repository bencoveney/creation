import { lookupValues } from "../../history/lookup";
import { Tile } from "../../world";
import { Name } from "../language/name";
import { Tooltip } from "./../layout/tooltip";
import { Motif } from "./../motif";
import { PropsWithChildren } from "react";
import { useLanguage } from "../language/languageContext";
import { useHistory } from "../historyContext";

export function MapTile({ tile }: { tile: Tile }) {
  const history = useHistory();
  if (!tile.discovered) {
    return null;
  }
  const beings = lookupValues(history.beings).filter(
    (being) => being.location === tile.id
  );
  const language = useLanguage();
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
        <Name language={language} named={tile} />
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
