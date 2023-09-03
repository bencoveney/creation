import { Tooltip } from "./tooltip";

export function Name({
  languageName,
  word,
}: {
  languageName: string;
  word: string;
}) {
  return <Tooltip label={`From the language ${languageName}`}>{word}</Tooltip>;
}
