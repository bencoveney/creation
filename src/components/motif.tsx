import { Being, History } from "../worldgen";

export function Motif({
  history,
  motif,
}: {
  history: History;
  motif: Being["motif"] | undefined;
}) {
  return (
    <>
      {motif
        ? history.config.motifs.find((match) => match.name === motif?.value)
            ?.unicode
        : "?"}
    </>
  );
}
