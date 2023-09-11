import { Children, ReactElement, ReactNode, useState } from "react";
import { Tab, TabProps } from "./Tab";
import React from "react";
import { TabButton } from "./TabButton";

interface Props {
  children?: ReactElement<TabProps>[];
}

const Tabs = ({ children }: Props) => {
  const childArray = Children.toArray(children);
  const [activeTab, setActiveTab] = useState<ReactNode>(childArray[0]);

  const handleSelection = (tabIndex: number) => {
    setActiveTab(childArray[tabIndex]);
  };

  const labels = Children.map(children, (element, i) => {
    if (!React.isValidElement(element)) return;
    const { label } = element.props;
    return (
      <li>
        <TabButton
          onSelect={() => {
            handleSelection(i);
          }}
        >
          {label}
        </TabButton>
      </li>
    );
  });

  return (
    <div className="flex gap-4 flex-col">
      <ul className="flex flex-row justify-around">{labels}</ul>
      <div>{activeTab}</div>
    </div>
  );
};

export { Tabs };
export { Tab } from "./Tab";
export { TabButton } from "./TabButton";
