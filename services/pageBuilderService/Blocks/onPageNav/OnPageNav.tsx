import React from "react";

import { Article, OnPageNav } from "types";
import Link from "next/link";
import { scrollTo } from "@hooks/useScrollTo";
export const onPageNavBlockQuery = `
_type == "onPageNav" => {
    ...,
}
`;

export type ListingBlockItem = Article;

export interface onPageNavResult extends OnPageNav {}
const onPageNavComponent: React.FC<onPageNavResult> = (props) => {
  const { items } = props;

  return (
    <div className=" sticky top-[90px] flex items-center justify-center bg-primary ">
      {items &&
        items.map(({ _key, title, link }) => {
          console.log(link);

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
