export type PlaybackControls = {
  tickOnce: () => void;
  tickAll: () => void;
  canTick: boolean;
  tickCount: number;
};

export function createPlaybackControls(
  doTick: (tick: number) => boolean
): PlaybackControls {
  const result: PlaybackControls = {
    canTick: true,
    tickOnce() {
      if (result.canTick) {
        result.tickCount++;
        result.canTick = doTick(result.tickCount);
      }
    },
    tickAll() {
      while (result.canTick) {
        result.tickCount++;
        result.canTick = doTick(result.tickCount);
      }
    },
    tickCount: 0,
  };
  return result;
}
