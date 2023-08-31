import { PropsWithChildren } from "react";

export function Grid({
  children,
  minWidth = 175,
  title,
}: PropsWithChildren & { minWidth?: number; title?: string }) {
  if (Array.isArray(children) && children.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gridGap: 10,
        margin: 10,
      }}
    >
      {title && <h2 style={{ gridColumn: "1/-1", margin: 0 }}>{title}</h2>}
      {children}
    </div>
  );
}

export function GridItem({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        backgroundColor: "#ddd",
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}
