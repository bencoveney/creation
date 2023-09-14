import { Preferences } from "../decision/preference";
import { round } from "../utils/maths";

export function TimesChosen({ timesChosen }: { timesChosen: Preferences }) {
  return (
    <>
      <h3>Times Chosen</h3>
      {Object.entries(timesChosen).map(([name, value]) => {
        return (
          <div key={name}>
            {name}: {round(value, 3)}
          </div>
        );
      })}
    </>
  );
}
