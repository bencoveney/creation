import { Tooltip } from "./layout/tooltip";

// TODO: Lang fix...

export function Name({
  languageName,
  word,
}: {
  languageName: string;
  word: string;
}) {
  return <Tooltip label={`From the language ${languageName}`}>{word}</Tooltip>;
}
