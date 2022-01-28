import React from "react";
import { scrollTo } from "@hooks/useScrollTo";
export const onPageNavBlockQuery = `
_type == "onPageNav" => {
    ...,
}
`;

export type OnPageNavItem = {
  _type: "onPageNavItem";
  title?: string;
  link?: string;
  _key: string;
};

export interface onPageNavResult {
  _type: "onPageNav";
  name?: string;
  items?: OnPageNavItem[];
}
const onPageNavComponent: React.FC<onPageNavResult> = (props) => {
  const { items } = props;

  return (
    <div className=" sticky top-[90px] flex items-center justify-center bg-primary ">
      {items &&
        items.map(({ _key, title, link }) => {
          return (
            <button
              className=" px-4 py-5 "
              onClick={() => scrollTo({ id: `${link}` })}
              key={_key}
            >
              {title}
            </button>
          );
        })}
    </div>
  );
};

export default onPageNavComponent;
