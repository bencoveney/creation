export function Id({ value }: { value: string }) {
  return (
    <span style={{ color: "grey", fontFamily: "monospace" }}>#{value}</span>
  );
}
