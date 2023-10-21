import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { Language } from "../../language";
import { Names } from "./names";

export function LanguageSummary({
  language,
  inspect,
}: {
  language: Language;
} & InspectProps) {
  return (
    <>
      <InspectLink id={language.id} inspect={inspect} kind="language" />
      <Names named={language} />
      <div>Words: {language.registry.knownWords.size}</div>
    </>
  );
}
