import {
  HeaderNavigation,
  NavigationItemBase,
  NavItemBaseProps,
} from "modules/Navigation";
import * as React from "react";
import { NavItem } from "@services/NavigationService/types";

interface IAppProps {}

const items: NavItem[] = [
  {
    label: "testItem1",
    link: { href: "/home" },
  },
  {
    label: "testItem2",
    items: [{ label: "testsSubItem", link: { href: "/home" } }],
  },
  {
    label: "testItem3",
    items: [
      {
        label: "testsSubItem",
        items: [{ label: "testsSubSubItem", link: { href: "/home" } }],
      },
    ],
  },
];

const TestItemBase: React.FC<NavItemBaseProps> = (props) => {
  const { children, place } = props;

  if (place === "header") {
    return <div className="px-12 text-green-500 ">{children}</div>;
  }

  return <NavigationItemBase {...props} />;
};

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className="mt-64">
      <HeaderNavigation items={items} NavigationItemBase={TestItemBase} />
    </div>
  );
};

export default App;
