import { PropsWithChildren, ReactElement, useState } from "react";
import { Tab } from "./tab";
import { getQueryParam, modifyQueryParam } from "../../utils/queryParams";
import { FixedTop } from "./fixedTop";
import { Button } from "./button";
import { Toolbar } from "./toolbar";

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
    <FixedTop>
      <Toolbar>
        {labels.map((label) => (
          <Button
            key={label}
            selected={selected === label}
            onClick={() => {
              modifyQueryParam("tab", label);
              setSelected(label);
            }}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
      {childrenArray.find((child) => child.props.label === selected)}
    </FixedTop>
  );
}
