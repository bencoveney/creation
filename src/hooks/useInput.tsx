import { ReactElement, useState } from "react";
import { TextInput } from "../components/layout/textInput";

export function useInput(label: string): [string, ReactElement] {
  const [value, setValue] = useState("");
  const input = (
    <TextInput
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
  return [value, input];
}
