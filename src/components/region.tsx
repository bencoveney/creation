import { History, Region } from "../history";
import { Id } from "./layout/id";
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
