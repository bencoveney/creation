import { PropsWithChildren } from "react";

export function CommaSeparate({ children }: PropsWithChildren): JSX.Element {
  if (!Array.isArray(children)) {
    throw new Error("What");
  }
  return <>{children.map((child, i) => [i > 0 && ", ", child])}</>;
}
