import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { NewLanguage } from "../../language/names";
import { Names } from "./names";

export function LanguageSummary({
  newLanguage,
  inspect,
}: {
  newLanguage: NewLanguage;
} & InspectProps) {
  return (
    <>
      <InspectLink id={newLanguage.id} inspect={inspect} kind="language" />
      <Names named={newLanguage} />
      <div>Words: {newLanguage.registry.knownWords.size}</div>
    </>
  );
}
