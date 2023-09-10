import { PropsWithChildren } from "react";
import { getForState, inputFontSize, theme } from "./theme";

export function Button({
  children,
  onClick,
  selected,
  disabled,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}>) {
  return (
    <button
      style={{
        backgroundColor: getForState(
          theme.backgroundColor,
          !!selected,
          !!disabled
        ),
        color: getForState(theme.color, !!selected, !!disabled),
        borderBottomWidth: getForState(
          theme.borderBottomWidth,
          !!selected,
          !!disabled
        ),
        borderBottomColor: getForState(
          theme.borderBottomColor,
          !!selected,
          !!disabled
        ),
        cursor: getForState(theme.cursor, !!selected, !!disabled),
        padding: getForState(theme.padding, !!selected, !!disabled),
        margin: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderStyle: "solid",
        fontSize: inputFontSize,
      }}
      onClick={onClick}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
}
