import { useCallback, useState } from "react";

export type Inspected = {
  kind: "being" | "region" | "artifact";
  id: string;
};

export type Inspect = (inspected: Inspected) => void;

export type InspectProps = {
  inspect: Inspect;
};

export function useInspect(): [Inspected | null, Inspect] {
  const [inspecting, setInspecting] = useState<Inspected | null>(null);
  const inspect = useCallback(
    (inspected: Inspected) => setInspecting(inspected),
    [setInspecting]
  );
  return [inspecting, inspect];
}
