import { PlaybackControls } from "../playback";

export function Playback({
  tickOnce,
  tickAll,
  restart,
  canTick,
  tickCount,
}: PlaybackControls) {
  return (
    <div>
      <button onClick={tickOnce} disabled={!canTick}>
        ▶️ Tick world
      </button>
      <button onClick={tickAll} disabled={!canTick}>
        {" "}
        ⏩ Run world
      </button>
      <button onClick={restart}> 🆕 Restart</button>
      Tick: {tickCount}
    </div>
  );
}
