import { Being, History } from "../worldgen";

export function Motif({
  history,
  motif,
}: {
  history: History;
  motif: Being["motif"];
}) {
  return (
    <>
      {
        history.config.motifs.find((match) => match.name === motif?.value)
          ?.unicode
      }
    </>
  );
}
