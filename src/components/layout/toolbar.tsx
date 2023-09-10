import { PropsWithChildren } from "react";
import { backgroundColorPale } from "./theme";

export function Toolbar({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        backgroundColor: backgroundColorPale,
      }}
    >
      {children}
    </div>
  );
}
