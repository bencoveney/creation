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
      🔎
      {getInspectEmoji(kind)}
      <Id value={id} />
    </Button>
  );
}

function getInspectEmoji(kind: Inspected["kind"]): string {
  switch (kind) {
    case "artifact":
      return "⚙️";
    case "being":
      return "🧍";
    case "language":
      return "💬";
    case "region":
      return "🏞️";
    default:
      return "❓";
  }
}
