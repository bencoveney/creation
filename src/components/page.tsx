import { History } from "../worldgen";
import {
  Language,
  getWords,
  spellPhoneme,
  spellWord,
  spellWords,
} from "../worldgen/language";
import { useInput } from "../hooks/useInput";
import { createTerrain, renderTerrain } from "../terrain";
import { Terrain } from "./terrain";

const logReplaceRegex = /\[\[([^\[\]]+)\]\]/g;
function formatLog(message: string, language: Language): string {
  return message.replace(
    logReplaceRegex,
    (_, word) => `${spellWords(getWords(word, language))}`
  );
}

const terrain = createTerrain(5, 5);

export function Page({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  const [filter, input] = useInput();
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr ".repeat(history.world?.width!),
          gridTemplateRows: "1fr ".repeat(history.world?.height!),
          gridGap: 10,
        }}
      >
        {history.world?.cells.map((cell, index) => {
          const region = history.regions.map.get(cell.location);
          return (
            <div
              key={index}
              style={{
                gridRow: history.world?.height! - cell.y,
                aspectRatio: 1,
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
      </div>
      <div>
        <Terrain terrain={terrain} />
        {renderTerrain(terrain)
          .split("\n")
          .map((row, index) => (
            <div key={index}>{row}</div>
          ))}
      </div>
      <form>{input}</form>
      <ul>
        {history.log.entries
          .map<[number, string]>(([tick, ...log]) => [
            tick,
            formatLog(log.join(","), language),
          ])
          .filter(([tick, log]) => log.includes(filter))
          .map(([tick, ...log], index) => {
            return (
              <li key={index}>
                {tick} {formatLog(log.join(","), language)}
              </li>
            );
          })}
      </ul>
      <ul>
        {[...history.regions.map.values()].map((region) => {
          return (
            <li key={region.id}>
              Region {region.id}: {region.name}{" "}
              <i>{spellWords(getWords(region.name, language))}</i>
            </li>
          );
        })}
      </ul>
      <ul>
        {[...history.beings.map.values()].map((being) => {
          return (
            <li key={being.id}>
              Being {being.id}: {being.name}{" "}
              <i>{spellWords(getWords(being.name, language))}</i>{" "}
              {being.motif && being.motif.value}
            </li>
          );
        })}
      </ul>
      <ul>
        {[...history.artifacts.map.values()].map((artifact) => {
          return (
            <li key={artifact.id}>
              Artifact {artifact.id}: {artifact.name}{" "}
              <i>{spellWords(getWords(artifact.name, language))}</i>{" "}
              {artifact.object}
            </li>
          );
        })}
      </ul>
      <ul>
        {[...history.dialects.map.values()].map(({ id, language }) => {
          return (
            <li key={id}>
              Dialect {id}:
              <ul>
                <li>
                  Onset: {language.syllableStructure.minOnset} -{" "}
                  {language.syllableStructure.maxOnset}
                </li>
                <li>
                  Nucleus: {language.syllableStructure.minNucleus} -{" "}
                  {language.syllableStructure.maxNucleus}
                </li>
                <li>
                  Coda: {language.syllableStructure.minCoda} -{" "}
                  {language.syllableStructure.maxCoda}
                </li>
                <li>
                  Single Vowels:{" "}
                  {language.phonemes.singleVowels
                    .map((phoneme) => spellPhoneme(phoneme))
                    .join(", ")}
                </li>
                <li>
                  Dipthongs:{" "}
                  {language.phonemes.dipthongs
                    .map((phoneme) => spellPhoneme(phoneme))
                    .join(", ")}
                </li>
                <li>
                  Unvoiced Constonants:{" "}
                  {language.phonemes.unvoicedConstants
                    .map((phoneme) => spellPhoneme(phoneme))
                    .join(", ")}
                </li>
                <li>
                  Voiced Constonants:{" "}
                  {language.phonemes.voicedConstants
                    .map((phoneme) => spellPhoneme(phoneme))
                    .join(", ")}
                </li>
                <li>
                  Words{" "}
                  <ul>
                    {Object.entries(language.words).map(([word, voicing]) => {
                      return (
                        <li key={word}>
                          {word} <i>{spellWord(voicing)}</i>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
