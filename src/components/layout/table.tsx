import { Fragment, PropsWithChildren } from "react";
import { backgroundColorPale, getForState, spacer, theme } from "./theme";

export function Table({
  children,
  cols,
}: PropsWithChildren & { cols: number }) {
  if (!Array.isArray(children)) {
    throw new Error("Weird table");
  }
  const cells = children
    .flat()
    .map((el) => (el.type === Fragment ? el.props.children : el))
    .flat();
  if (cells.length % cols !== 0) {
    throw new Error("Weird table");
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `max-content max-content auto max-content max-content`,
        position: "relative",
        height: "100%",
        overflow: "auto",
      }}
    >
      {cells.map((child, index) => (
        <div
          key={index}
          style={
            index < cols
              ? {
                  position: "sticky",
                  top: 0,
                  padding: spacer.small,
                  borderBottomColor: getForState(
                    theme.borderBottomColor,
                    false,
                    false
                  ),
                  backgroundColor: backgroundColorPale,
                }
              : {
                  padding: spacer.xSmall,
                  borderBottomColor: getForState(
                    theme.borderBottomColor,
                    false,
                    false
                  ),
                }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
