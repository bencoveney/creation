import { createRoot } from "react-dom/client";
import { initWorld, tickWorld } from "./worldgen";
import { populateWorld } from "./worldgen/populate";
import {
  getWords,
  spellPhoneme,
  spellWord,
  spellWords,
} from "./worldgen/language";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find #root in document");
}

const world = initWorld();
populateWorld(world);
tickWorld(world);
console.log(world);

const { language } = [...world.dialects.map.values()][0];

const buh = createRoot(root);
buh.render(
  <div>
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
            <i>{spellWords(getWords(being.name, language))}</i>
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
