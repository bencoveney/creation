import { PropsWithChildren, ReactElement, useState } from "react";
import { Tab } from "./tab";
import { getQueryParam, modifyQueryParam } from "../utils/queryParams";

export function Tabs({ children }: PropsWithChildren) {
  const childrenArray: ReactElement[] = Array.isArray(children)
    ? children
    : [children];
  const labels = childrenArray.map((child) => {
    if (child.type !== Tab) {
      throw new Error("Bad tab element");
    }
    return child.props.label as string;
  });
  const [selected, setSelected] = useState(getQueryParam("tab") || labels[0]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        {labels.map((label) => (
          <div
            key={label}
            style={{
              padding: 10,
              borderBottomStyle: "solid",
              borderBottomColor: "greenyellow",
              borderBottomWidth: selected === label ? 3 : 0,
            }}
            onClick={() => {
              modifyQueryParam("tab", label);
              setSelected(label);
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div>{childrenArray.find((child) => child.props.label === selected)}</div>
    </div>
  );
}
