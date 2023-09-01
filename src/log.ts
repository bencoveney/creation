export type LogEntry = [number, string, ...string[]];

export type Logger = {
  (...args: any[]): void;
  tick: number;
  entries: LogEntry[];
  currentSystem: string;
  knownSystems: Set<string>;
};

export function createLogger(tick: number): Logger {
  const entries: Logger["entries"] = [];
  const logger: Logger = ((...args: any[]) => {
    logger.knownSystems.add(logger.currentSystem);
    entries.push([
      logger.tick,
      logger.currentSystem,
      ...args.map((arg) => arg.toString()),
    ]);
  }) as Logger;
  logger.tick = tick;
  logger.entries = entries;
  logger.currentSystem = "init";
  logger.knownSystems = new Set();
  return logger;
}
