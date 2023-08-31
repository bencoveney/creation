import { History, Dialect } from "../worldgen";
import { getWord, spellPhoneme, spellWord } from "../worldgen/language";
import { Id } from "./id";
import { Names } from "./names";
import { Tooltip } from "./tooltip";

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
          Unvoiced Constonants:{" "}
          {language.phonemes.unvoicedConstants
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
        <li>
          Voiced Constonants:{" "}
          {language.phonemes.voicedConstants
            .map((phoneme) => spellPhoneme(phoneme))
            .join(", ")}
        </li>
      </ul>
      <ul style={{ margin: 0, padding: 0 }}>
        {Object.entries(language.words).map(([word, voicing]) => {
          return (
            <li
              key={word}
              style={{
                display: "inline-block",
                margin: 2,
                padding: 2,
                border: "1px solid grey",
              }}
            >
              {word}: <i>{spellWord(voicing)}</i>
            </li>
          );
        })}
      </ul>
    </>
  );
}
