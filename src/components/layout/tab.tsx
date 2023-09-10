import { PropsWithChildren } from "react";

export function Tab({ children }: PropsWithChildren & { label: string }) {
  return <>{children}</>;
}
