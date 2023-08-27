import { History } from "../worldgen";
import { Language, getWords, spellWords } from "../worldgen/language";
import { useInput } from "../hooks/useInput";

const logReplaceRegex = /\[\[([^\[\]]+)\]\]/g;
function formatLog(message: string, language: Language): string {
  return message.replace(
    logReplaceRegex,
    (_, word) => `${spellWords(getWords(word, language))}`
  );
}

export function Log({
  history,
  language,
}: {
  history: History;
  language: Language;
}) {
  const [filter, input] = useInput();
  return (
    <>
      <form>{input}</form>
      <ul>
        {history.log.entries
          .map<[number, string]>(([tick, ...log]) => [
            tick,
            formatLog(log.join(","), language),
          ])
          .filter(([_, log]) => log.includes(filter))
          .map(([tick, ...log], index) => {
            return (
              <li key={index}>
                {tick} {formatLog(log.join(","), language)}
              </li>
            );
          })}
      </ul>
    </>
  );
}
