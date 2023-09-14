import { History } from "../../state/history";
import { Language, getWords, spellWords } from "../../state/language/language";
import { lookupValues } from "../../state/history/lookup";
import { Tile } from "../../state/world";
import { Name } from "./../name";
import { Tooltip } from "./../layout/tooltip";
import { Motif } from "./../motif";
import { PropsWithChildren } from "react";

export function MapTile({
  tile,
  history,
  language,
}: {
  tile: Tile;
  history: History;
  language: Language;
}) {
  if (!tile.discovered) {
    return null;
  }
  const languageName = spellWords(getWords(language.name, language));
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
        <Name
          languageName={languageName}
          word={spellWords(getWords(tile.name, language))}
        />
      </BlackLabel>
      <br />
      {beings.length ? (
        <BlackLabel>
          {beings.map((being, index) => (
            <Tooltip
              key={index}
              label={spellWords(getWords(being.name, language))}
            >
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
