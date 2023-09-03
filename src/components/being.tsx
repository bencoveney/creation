import { History, Being } from "../worldgen";
import { Id } from "./id";
import { Motif } from "./motif";
import { Names } from "./names";

export function Being({ being, history }: { being: Being; history: History }) {
  return (
    <>
      <Id value={being.id} /> {being.name}:
      <Names name={being.name} history={history} />
      <Motif motif={being.motif} />
      {being.theme && `Deity of ${being.theme}`}
    </>
  );
}
