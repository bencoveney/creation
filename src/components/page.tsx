import { Log } from "./log";
import { Playback } from "./playback";
import { PlaybackControls } from "../playback";
import { Grid, GridItem } from "./layout/grid";
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
import { LanguageSummary } from "./language/languageSummary";
import { useHistory } from "./historyContext";

export function Page({
  playbackControls,
}: {
  playbackControls: PlaybackControls;
}) {
  const [inspected, inspect] = useInspect();
  const history = useHistory();
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
          <World inspect={inspect} />
        </Tab>
        <Tab label={"Log"}>
          <Log inspect={inspect} />
        </Tab>
        <Tab label={"Regions"}>
          <Grid title="Regions">
            {lookupValues(history.regions).map((region) => {
              return (
                <GridItem key={region.id}>
                  <RegionSummary region={region} inspect={inspect} />
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
                  <BeingSummary being={being} inspect={inspect} />
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
                  <ArtifactSummary artifact={artifact} inspect={inspect} />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        <Tab label={"Languages"}>
          <Grid title="Languages" minWidth={350}>
            {lookupValues(history.languages).map((language) => {
              return (
                <GridItem key={language.id}>
                  <LanguageSummary language={language} inspect={inspect} />
                </GridItem>
              );
            })}
          </Grid>
        </Tab>
        {inspected && (
          <Tab label={`Inspect ${inspected.kind} #${inspected.id}`}>
            <Inspect inspected={inspected} inspect={inspect} />
          </Tab>
        )}
      </Tabs>
    </FixedTop>
  );
}
