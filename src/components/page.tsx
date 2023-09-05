import { History } from "../worldgen";
import { Language } from "../worldgen/language";
import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";
import { Being } from "./being";
import { Grid, GridItem } from "./grid";
import { Artifact } from "./artifact";
import { Region } from "./region";
import { Dialect } from "./dialect";
import { lookupValues } from "../utils/lookup";
import { World } from "./world";

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
      <World history={history} language={language} />
      <Log history={history} language={language} />
      <Grid title="Regions">
        {lookupValues(history.regions).map((region) => {
          return (
            <GridItem key={region.id}>
              <Region region={region} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Beings">
        {lookupValues(history.beings).map((being) => {
          return (
            <GridItem key={being.id}>
              <Being being={being} history={history} language={language} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Artifacts">
        {lookupValues(history.artifacts).map((artifact) => {
          return (
            <GridItem key={artifact.id}>
              <Artifact artifact={artifact} history={history} />
            </GridItem>
          );
        })}
      </Grid>
      <Grid title="Dialects" minWidth={350}>
        {lookupValues(history.dialects).map((dialect) => {
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
