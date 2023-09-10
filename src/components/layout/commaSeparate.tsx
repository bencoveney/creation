import { PropsWithChildren } from "react";

export function CommaSeparate({ children }: PropsWithChildren) {
  if (!Array.isArray(children)) {
    return children;
  }
  return <>{children.map((child, i) => [i > 0 && ", ", child])}</>;
}
