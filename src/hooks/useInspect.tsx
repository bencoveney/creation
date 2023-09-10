import { useCallback, useState } from "react";

export type Inspected = {
  kind: "being" | "region";
  id: string;
};

export type InspectBeing = (beingId: string) => void;
export type InspectRegion = (regionId: string) => void;

export type InspectProps = {
  inspectBeing: InspectBeing;
  inspectRegion: InspectRegion;
};

export function useInspect(): [Inspected | null, InspectBeing, InspectRegion] {
  const [inspecting, setInspecting] = useState<Inspected | null>(null);
  const inspectBeing = useCallback(
    (beingId: string) => setInspecting({ kind: "being", id: beingId }),
    [setInspecting]
  );
  const inspectRegion = useCallback(
    (regionId: string) => setInspecting({ kind: "region", id: regionId }),
    [setInspecting]
  );
  return [inspecting, inspectBeing, inspectRegion];
}
