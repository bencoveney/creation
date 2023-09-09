import { PropsWithChildren } from "react";

export function Tab({ children }: PropsWithChildren & { label: string }) {
  return <div>{children}</div>;
}
