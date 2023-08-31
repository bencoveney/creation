import { PropsWithChildren } from "react";

export function Grid({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gridGap: 10,
      }}
    >
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
