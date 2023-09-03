import { MouseEventHandler, useCallback, useState } from "react";

export function useHoverPosition(): [
  MouseEventHandler,
  null | number,
  null | number
] {
  const [pos, setPos] = useState<[null | number, null | number]>([null, null]);
  const handleMouseMove: MouseEventHandler = useCallback(
    (e) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.x;
      const y = e.clientY - bounds.y;
      setPos([x, y]);
    },
    [setPos]
  );

  return [handleMouseMove, ...pos];
}
