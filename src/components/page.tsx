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
import { Artifact } from "./artifact";
import { Region } from "./region";
import { Dialect } from "./dialect";

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
      <Grid title="Regions">
        {[...history.regions.map.values()].map((region) => {
          return (
            <GridItem key={region.id}>
              <Region region={region} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Beings">
        {[...history.beings.map.values()].map((being) => {
          return (
            <GridItem key={being.id}>
              <Being being={being} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Artifacts">
        {[...history.artifacts.map.values()].map((artifact) => {
          return (
            <GridItem key={artifact.id}>
              <Artifact artifact={artifact} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Dialects" minWidth={350}>
        {[...history.dialects.map.values()].map((dialect) => {
          return (
            <GridItem key={dialect.id}>
              <Dialect dialect={dialect} history={history} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}
