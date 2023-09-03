import { config } from "../config";
import { Being } from "../worldgen";

export function Motif({ motif }: { motif: Being["motif"] | undefined }) {
  return (
    <>
      {motif
        ? config.motifs.find((match) => match.name === motif?.value)?.unicode
        : "?"}
    </>
  );
}
