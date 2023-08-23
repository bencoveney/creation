import { createRoot } from "react-dom/client";
import { initHistory, tick } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import {
  Language,
  getWord,
  getWords,
  spellPhoneme,
  spellWord,
  spellWords,
} from "./worldgen/language";
import React from "react";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

const world = initHistory();
populateWorld(world);
for (let i = 0; i < 75; i++) {
  tick(world);
}
const { language } = [...world.dialects.map.values()][0];

["the", "of"].map((word) => getWord(word, language, 1));

const logReplaceRegex = /\[\[([^\[\]]+)\]\]/g;
function formatLog(message: string, language: Language): React.ReactElement {
  return (
    <>
      {message.replace(
        logReplaceRegex,
        (_, word) => `${spellWords(getWords(word, language))}`
      )}
    </>
  );
}

const buh = createRoot(root);
buh.render(
  <div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr ".repeat(world.world?.width!),
        gridTemplateRows: "1fr ".repeat(world.world?.height!),
        gridGap: 10,
      }}
    >
      {world.world?.cells.map((cell, index) => (
        <div
          key={index}
          style={{
            gridRow: world.world?.height! - cell.y,
            aspectRatio: 1,
          }}
        >
          <span>{world.regions.map.get(cell.location)?.name!}</span>
          <div>
            {spellWords(
              getWords(world.regions.map.get(cell.location)?.name!, language)
            )}
          </div>
          <div>
            ({cell.x}, {cell.y})
          </div>
          {...[...world.beings.map.values()]
            .filter((being) => being.location === cell.location)
            .map((being, index) => (
              <div key="index">
                {spellWords(getWords(being.name, language))}
              </div>
            ))}
        </div>
      ))}
    </div>
    <ul>
      {world.log.entries.map(([tick, ...log], index) => {
        return (
          <li key={index}>
            {tick} {formatLog(log.join(","), language)}
          </li>
        );
      })}
    </ul>
    <ul>
      {[...world.regions.map.values()].map((region) => {
        return (
          <li key={region.id}>
            Region {region.id}: {region.name}{" "}
            <i>{spellWords(getWords(region.name, language))}</i>
          </li>
        );
      })}
    </ul>
    <ul>
      {[...world.beings.map.values()].map((being) => {
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
      {[...world.artifacts.map.values()].map((artifact) => {
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
      {[...world.dialects.map.values()].map(({ id, language }) => {
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
