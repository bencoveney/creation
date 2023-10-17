import { config } from "../../config";

export const rootConcepts = [
  ...config.themes.map((theme) => theme.name),
  "speech",
  "world",
];

export const affixConcepts = ["deity", "place"];
