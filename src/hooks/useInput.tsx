import { ReactElement, useState } from "react";

export function useInput(): [string, ReactElement] {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    />
  );
  return [value, input];
}
