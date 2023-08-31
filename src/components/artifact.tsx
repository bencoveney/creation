import { History, Artifact } from "../worldgen";
import { Id } from "./id";
import { Names } from "./names";

export function Artifact({
  artifact,
  history,
}: {
  artifact: Artifact;
  history: History;
}) {
  return (
    <>
      <Id value={artifact.id} /> {artifact.name}:
      <Names name={artifact.name} history={history} />
      {artifact.object}
    </>
  );
}
