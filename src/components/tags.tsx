import { PropsWithChildren } from "react";

export function Tags({ children }: PropsWithChildren) {
  if (Array.isArray(children) && children.length === 0) {
    return null;
  }
  return <ul style={{ margin: 0, padding: 0 }}>{children}</ul>;
}

export function TagsItem({ children }: PropsWithChildren) {
  return (
    <li
      style={{
        display: "inline-block",
        margin: 2,
        padding: 2,
        border: "1px solid grey",
      }}
    >
      {children}
    </li>
  );
}
