import { PlaybackControls } from "../playback";
import { getQueryBool, modifyQueryBool } from "../utils/queryParams";
import { Button } from "./layout/button";

const toggleAutorun = () => {
  const current = getQueryBool("pauseOnStart");
  modifyQueryBool("pauseOnStart", !current);
};

const restart = () => {
  window.location.reload();
};

export function Playback({
  tickOnce,
  tickAll,
  canTick,
  tickCount,
}: PlaybackControls) {
  return (
    <div>
      <Button onClick={tickOnce} disabled={!canTick}>
        ▶️ Tick world
      </Button>
      <Button onClick={tickAll} disabled={!canTick}>
        ⏩ Run world
      </Button>
      <Button onClick={restart}>🔃 Restart</Button>
      <Button onClick={toggleAutorun}>🏃 Toggle autorun</Button>
      Tick: {tickCount}
    </div>
  );
}
