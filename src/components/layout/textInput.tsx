import { getForState, inputFontSize, spacer, theme } from "./theme";

export function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <span
      style={{
        backgroundColor: getForState(theme.backgroundColor, false, false),
        color: getForState(theme.color, false, false),
        padding: `${spacer.small}px`,
        margin: 0,
      }}
    >
      {label}:
      <input
        style={{
          padding: `${spacer.xSmall}px`,
          margin: 0,
          marginLeft: `${spacer.small}px`,
          borderStyle: "solid",
          fontSize: inputFontSize,
        }}
        value={value}
        onChange={onChange}
        type="text"
      />
    </span>
  );
}
