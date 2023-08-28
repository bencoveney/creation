import { History } from "../worldgen";
import {
  Language,
  getWords,
  spellPhoneme,
  spellWord,
  spellWords,
} from "../worldgen/language";
import { Map } from "./map";
import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";

export function Page({
  history,
  language,
  playbackControls,
}: {
  history: History;
  language: Language;
  playbackControls: PlaybackControls;
}) {
  return (
    <div>
      <Playback {...playbackControls} />
      <Map history={history} language={language} />
      <Log history={history} language={language} />
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
