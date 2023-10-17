import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { NewLanguage } from "../../language/names";

export function LanguageSummary({
  newLanguage,
  inspect,
}: {
  newLanguage: NewLanguage;
} & InspectProps) {
  return (
    <>
      <InspectLink id={newLanguage.id} inspect={inspect} kind="language" />
      <div>{newLanguage.names.defaultKey}</div>
      <div>Words: {newLanguage.registry.knownWords.size}</div>
    </>
  );
}
