export type PlaybackControls = {
  tickOnce: () => void;
  tickAll: () => void;
  restart: () => void;
  canTick: boolean;
  tickCount: number;
};

export function createPlaybackControls(
  init: (tick: number) => void,
  doTick: (tick: number) => boolean
): PlaybackControls {
  const result: PlaybackControls = {
    canTick: true,
    restart() {
      result.tickCount = 0;
      result.canTick = true;
      init(result.tickCount);
    },
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
