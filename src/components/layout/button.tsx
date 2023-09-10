import { CSSProperties, PropsWithChildren } from "react";
import { getForState, inputFontSize, spacer, theme } from "./theme";

export function Button({
  children,
  onClick,
  selected,
  disabled,
  compact,
  style,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  compact?: boolean;
  style?: CSSProperties | undefined;
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
        padding: compact
          ? spacer.small
          : getForState(theme.padding, !!selected, !!disabled),
        margin: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderStyle: "solid",
        fontSize: inputFontSize,
        ...style,
      }}
      onClick={onClick}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
}
