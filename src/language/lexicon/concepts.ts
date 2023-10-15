import { config } from "../../config";

export const rootConcepts = [...config.themes.map((theme) => theme.name)];

export const affixConcepts = ["deity", "place"];
