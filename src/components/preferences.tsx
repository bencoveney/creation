import { Preferences } from "../state/decision/preference";
import { round } from "../utils/maths";

export function Preferences({ preferences }: { preferences: Preferences }) {
  return (
    <>
      <h3>Preferences</h3>
      {Object.entries(preferences).map(([name, value]) => {
        return (
          <div key={name}>
            {name}: {round(value, 3)}
          </div>
        );
      })}
    </>
  );
}
