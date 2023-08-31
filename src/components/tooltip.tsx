import { PropsWithChildren } from "react";

export function Tooltip({
  children,
  label,
}: { label: string } & PropsWithChildren) {
  return (
    <span
      title={label}
      style={{
        textDecoration: "underline",
        textDecorationStyle: "dotted",
      }}
    >
      {children}
    </span>
  );
}
