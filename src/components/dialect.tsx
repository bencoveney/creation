import { History, Dialect } from "../history";
import { spellPhoneme, spellWord } from "../language/spelling";
import { Id } from "./layout/id";
import { Names } from "./names";
import { Tags, TagsItem } from "./layout/tags";
import { Tooltip } from "./layout/tooltip";

export function Dialect({
  dialect,
  history,
}: {
  dialect: Dialect;
  history: History;
}) {
  const { id, language } = dialect;
  return (
    <>
      <Id value={id} />
      <Names name={language.name} history={history} />
      <ul>
        <li>
          Structure:{" "}
          <Tooltip label="Onset">
            [{language.syllableStructure.minOnset}-
            {language.syllableStructure.maxOnset}]
          </Tooltip>
          <Tooltip label="Nucleus">
            [{language.syllableStructure.minNucleus}-
            {language.syllableStructure.maxNucleus}]
          </Tooltip>
          <Tooltip label="Coda">
            [{language.syllableStructure.minCoda}-
            {language.syllableStructure.maxCoda}]
          </Tooltip>
        </li>
        <li>
          Single Vowels:{" "}
          {language.phonemes.singleVowels
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
        <li>
          Dipthongs:{" "}
          {language.phonemes.dipthongs
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
        <li>
          Unvoiced Consonants:{" "}
          {language.phonemes.unvoicedConstants
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
        <li>
          Voiced Consonants:{" "}
          {language.phonemes.voicedConstants
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
      </ul>
      <Tags>
        {Object.entries(language.words).map(([word, voicing]) => (
          <TagsItem key={word}>
            {word}: <i>{spellWord(voicing)}</i>
          </TagsItem>
        ))}
      </Tags>
      <ul style={{ margin: 0, padding: 0 }}></ul>
    </>
  );
}
