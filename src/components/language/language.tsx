import { InspectProps } from "../../hooks/useInspect";
import { InspectLink } from "../inspectLink";
import { Language } from "../../language";
import { etymology, spellWord } from "../../language/lexicon/word";
import { Names } from "./names";
import { WordRegistry } from "../../language/lexicon/wordRegistry";

export function Language({
  language,
  inspect,
}: {
  language: Language;
} & InspectProps) {
  return (
    <>
      <InspectLink id={language.id} inspect={inspect} kind="language" />
      <Names named={language} />
      <WordsTable registry={language.registry} />
    </>
  );
}

function WordsTable({ registry }: { registry: WordRegistry }) {
  return (
    <table style={{ width: "100%" }}>
      <tr>
        <th>Concept</th>
        <th>Pronounciation</th>
        <th>Etymology</th>
      </tr>
      {[...registry.conceptLookup.entries()].map(([key, word]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{spellWord(word)}</td>
          <td>{etymology(word)}</td>
        </tr>
      ))}
    </table>
  );
}
