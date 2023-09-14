import { History } from "../state/history";
import { Language } from "../state/language/language";
import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";
import { Being } from "./being";
import { Grid, GridItem } from "./layout/grid";
import { Artifact } from "./artifact";
import { Region } from "./region";
import { Dialect } from "./dialect";
import { lookupValues } from "../state/history/lookup";
import { World } from "./world";
import { Tab } from "./layout/tab";
import { Tabs } from "./layout/tabs";
import { FixedTop } from "./layout/fixedTop";
import { Toolbar } from "./layout/toolbar";
import { useInspect } from "../hooks/useInspect";
import { Inspect } from "./inspect";

export function Page({
  history,
  language,
  playbackControls,
}: {
  history: History;
  language: Language;
  playbackControls: PlaybackControls;
}) {
  const [inspected, inspect] = useInspect();
  return (
    <FixedTop>
      <Toolbar>
        <Playback {...playbackControls} />
      </Toolbar>
      <Tabs
        selectedTab={
          inspected !== null
            ? `Inspect ${inspected.kind} #${inspected.id}`
            : undefined
        }
      >
        <Tab label={"World"}>
          <World history={history} language={language} inspect={inspect} />
        </Tab>
        <Tab label={"Log"}>
          <Log history={history} language={language} inspect={inspect} />
        </Tab>
        <Tab label={"Regions"}>
          <Grid title="Regions">
            {lookupValues(history.regions).map((region) => {
              return (
                <GridItem key={region.id}>
                  <Region region={region} history={history} />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        <Tab label={"Beings"}>
          <Grid title="Beings">
            {lookupValues(history.beings).map((being) => {
              return (
                <GridItem key={being.id}>
                  <Being
                    being={being}
                    history={history}
                    language={language}
                    inspect={inspect}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        <Tab label={"Artifacts"}>
          <Grid title="Artifacts">
            {lookupValues(history.artifacts).map((artifact) => {
              return (
                <GridItem key={artifact.id}>
                  <Artifact artifact={artifact} history={history} />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        <Tab label={"Dialects"}>
          <Grid title="Dialects" minWidth={350}>
            {lookupValues(history.dialects).map((dialect) => {
              return (
                <GridItem key={dialect.id}>
                  <Dialect dialect={dialect} history={history} />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        {inspected && (
          <Tab label={`Inspect ${inspected.kind} #${inspected.id}`}>
            <Inspect
              history={history}
              language={language}
              inspected={inspected}
              inspect={inspect}
            />
          </Tab>
        )}
      </Tabs>
    </FixedTop>
  );
}
