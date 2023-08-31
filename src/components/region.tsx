import { History, Region } from "../worldgen";
import { Id } from "./id";
import { Names } from "./names";

export function Region({
  region,
  history,
}: {
  region: Region;
  history: History;
}) {
  return (
    <>
      <Id value={region.id} /> {region.name}:
      <Names name={region.name} history={history} />
    </>
  );
}
