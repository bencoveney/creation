export type LogEntry = [number, string, string, string[], string[]];

export type Logger = {
  (message: string, beingsInvolved: string[], regionsInvolved: string[]): void;
  tick: number;
  entries: LogEntry[];
  currentSystem: string;
  knownSystems: Set<string>;
};

export function createLogger(tick: number): Logger {
  const entries: Logger["entries"] = [];
  const logger: Logger = ((
    message: string,
    beingsInvolved: string[],
    regionsInvolved: string[]
  ) => {
    logger.knownSystems.add(logger.currentSystem);
    entries.push([
      logger.tick,
      logger.currentSystem,
      message,
      beingsInvolved,
      regionsInvolved,
    ]);
  }) as Logger;
  logger.tick = tick;
  logger.entries = entries;
  logger.currentSystem = "init";
  logger.knownSystems = new Set();
  return logger;
}
