import {
  ArtifactMaterial,
  ArtifactMaterialReference,
  ArtifactTemplate,
  artifactConfig,
} from "./config";
import { Artifact, Being } from "../history";
import { Lookup } from "../history/lookup";
import { createNames } from "../language";
import { randomChoice } from "../utils/random";
import { unique } from "../utils/array";

export function artifactFactory(
  creators: Being[],
  artifacts: Lookup<Artifact>
): Artifact {
  const item = randomChoice(artifactConfig.items);

  const holder = randomChoice(creators);
  const artifact = artifacts.set({
    creators: creators.map((creator) => creator.id),
    inPosessionOf: holder.id,
    ...itemFactory(
      creators.map((creator) => creator.theme!),
      item
    ),
  });
  holder.holding.push(artifact.id);

  return artifact;
}

function itemFactory(
  themes: string[],
  template: ArtifactTemplate
): Pick<Artifact, "object" | "names" | "material"> {
  const themeChoice = randomChoice(themes);
  const possibleMaterials = getAllowedMaterials(template.allowedMaterials);
  if (possibleMaterials.length === 0) {
    throw new Error("What");
  }
  const chosenMaterial = randomChoice(possibleMaterials);
  if (!chosenMaterial) {
    throw new Error("What");
  }
  return {
    object: template.name,
    names: createNames(themeChoice!, [template.name]),
    material: chosenMaterial.name,
  };
}

const materialsByName = artifactConfig.materials.reduce<{
  [key: string]: ArtifactMaterial;
}>((prev, next) => {
  prev[next.name] = next;
  return prev;
}, {});
const materialsBySet = artifactConfig.materials.reduce<{
  [key: string]: ArtifactMaterial[];
}>((prev, next) => {
  next.sets.forEach((set) => {
    if (!prev[set]) {
      prev[set] = [];
    }
    prev[set].push(next);
  });
  return prev;
}, {});

(function validateMaterials() {
  artifactConfig.items.forEach((item) => {
    item.allowedMaterials.forEach((allowedMaterial) => {
      switch (allowedMaterial.kind) {
        case "material":
          if (!materialsByName[allowedMaterial.name]) {
            throw new Error(`Bad`);
          }
          return;
        case "set":
          if (!materialsBySet[allowedMaterial.name]) {
            throw new Error(`Bad`);
          }
          return;
      }
    });
  });
})();

function getAllowedMaterials(
  allowedMaterials: ArtifactMaterialReference[]
): ArtifactMaterial[] {
  const results: ArtifactMaterial[] = [];
  allowedMaterials.forEach((materialReference) => {
    switch (materialReference.kind) {
      case "material":
        results.push(materialsByName[materialReference.name]);
        return;
      case "set":
        results.push(...materialsBySet[materialReference.name]);
        return;
      default:
        throw new Error("Whoops");
    }
  });
  return unique(results);
}
