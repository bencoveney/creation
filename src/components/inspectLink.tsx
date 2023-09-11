import { InspectProps, Inspected } from "../hooks/useInspect";
import { Button } from "./layout/button";
import { Id } from "./layout/id";

export function InspectLink({ id, kind, inspect }: Inspected & InspectProps) {
  return (
    <Button
      onClick={() => inspect({ id, kind })}
      style={{ minWidth: 100 }}
      compact
    >
      🔎{kind === "being" ? "🧍" : kind === "artifact" ? "⚙️" : "🏞️"}
      <Id value={id} />
    </Button>
  );
}
