import { History } from "../worldgen";
import {
  Language,
  getWord,
  getWords,
  spellPhoneme,
  spellWord,
  spellWords,
} from "../worldgen/language";
import { Map } from "./map";
import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";
import { Being } from "./being";
import { Grid, GridItem } from "./grid";

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
      <Grid>
        {[...history.beings.map.values()].map((being) => {
          return (
            <GridItem key={being.id}>
              <Being being={being} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <ul></ul>
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
                <li>Name: {spellWord(getWord(language.name, language))}</li>
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
