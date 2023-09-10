import { PropsWithChildren } from "react";

export function FixedTop({ children }: PropsWithChildren) {
  if (!Array.isArray(children)) {
    return null;
  }
  if (children.length !== 2) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: "100%",
      }}
    >
      <div
        style={{
          zIndex: 1,
          position: "relative",
          flexGrow: 0,
          flexShrink: 0,
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children[0]}
      </div>
      <div
        style={{
          zIndex: 0,
          position: "relative",
          flexGrow: 1,
          flexShrink: 1,
          overflow: "auto",
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}
