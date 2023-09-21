import { History } from "../history";
import { Language } from "../language/language";
import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";
import { Grid, GridItem } from "./layout/grid";
import { Dialect } from "./dialect";
import { lookupValues } from "../history/lookup";
import { World } from "./world";
import { Tab } from "./layout/tab";
import { Tabs } from "./layout/tabs";
import { FixedTop } from "./layout/fixedTop";
import { Toolbar } from "./layout/toolbar";
import { useInspect } from "../hooks/useInspect";
import { Inspect } from "./inspect";
import { BeingSummary } from "./beingSummary";
import { ArtifactSummary } from "./artifactSummary";
import { RegionSummary } from "./regionSummary";

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
                  <RegionSummary
                    region={region}
                    history={history}
                    inspect={inspect}
                  />
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
                  <BeingSummary
                    being={being}
                    history={history}
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
                  <ArtifactSummary
                    artifact={artifact}
                    history={history}
                    inspect={inspect}
                  />
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
