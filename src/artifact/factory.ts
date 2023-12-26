import {
  ArtifactMaterial,
  ArtifactMaterialReference,
  ArtifactPart,
  ArtifactPartTemplate,
  ArtifactTemplate,
  artifactConfig,
} from "./config";
import { Artifact, Being } from "../history";
import { Lookup } from "../history/lookup";
import { createNames } from "../language";
import { flipCoin, randomChoice } from "../utils/random";
import { unique } from "../utils/array";
import { commaSeparate } from "../utils/string";

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
): Pick<Artifact, "object" | "names" | "parts"> {
  const themeChoice = randomChoice(themes);
  const parts = getParts(template.parts);
  if (parts.length === 0) {
    throw new Error("What");
  }
  return {
    object: template.name,
    names: createNames(themeChoice!, [template.name]),
    parts,
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

function getParts(partTemplates: ArtifactPartTemplate[]): ArtifactPart[] {
  const parts: ArtifactPart[] = [];
  for (let i = 0; i < partTemplates.length; i++) {
    const partTemplate = partTemplates[i];
    if (!partTemplate.required) {
      const include = flipCoin();
      if (!include) {
        continue;
      }
    }
    const material = randomChoice(
      getAllowedMaterials(partTemplate.allowedMaterials)
    ).name;
    const part: ArtifactPart = {
      name: partTemplate.name,
      material,
      parts: getParts(partTemplate.parts),
    };
    parts.push(part);
  }
  return parts;
}

export function getMainPart(artifact: Artifact): ArtifactPart {
  return artifact.parts[0];
}

const vowels = ["a", "e", "i", "o", "u"];
function aOrAn(text: string, capitalise: boolean) {
  if (vowels.includes(text[0])) {
    return capitalise ? "An" : "an";
  }
  return capitalise ? "A" : "a";
}

export function getArtifactDescriptionShort(artifact: Artifact): string {
  const mainPart = getMainPart(artifact);
  return `${aOrAn(mainPart.material, true)} ${mainPart.material} ${
    artifact.object
  }.`;
}

// Really dumb at the moment - just goes to depth 2
export function getArtifactDescriptionLong(artifact: Artifact): string {
  const mainPart = getMainPart(artifact);
  let result = `${aOrAn(mainPart.material, true)} ${mainPart.material} ${
    artifact.object
  }.`;
  if (mainPart.parts.length > 0) {
    result += ` It has ${commaSeparate(
      mainPart.parts.map(
        (nested) =>
          `${aOrAn(nested.material, false)} ${nested.material} ${nested.name}`
      )
    )}.`;
  }
  for (let i = 1; i < artifact.parts.length; i++) {
    const otherPart = artifact.parts[i];
    result += ` It has ${aOrAn(otherPart.material, false)} ${
      otherPart.material
    } ${otherPart.name}.`;
    if (otherPart.parts.length > 0) {
      result += ` The ${otherPart.name} has ${commaSeparate(
        otherPart.parts.map(
          (nested) =>
            `${aOrAn(nested.material, false)} ${nested.material} ${nested.name}`
        )
      )}.`;
    }
  }
  return result;
}
