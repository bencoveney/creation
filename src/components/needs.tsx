import { Needs } from "../state/decision/need";
import { round } from "../utils/maths";

export function Needs({ needs }: { needs: Needs }) {
  return (
    <>
      <h3>Needs</h3>
      {Object.entries(needs).map(([name, value]) => {
        return (
          <div key={name}>
            {name}: {round(value.currentValue, 3)} (-{round(value.drainRate, 3)}
            )
          </div>
        );
      })}
    </>
  );
}
