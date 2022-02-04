import { ListingBlockItem } from "@components/Blocks/listingBlock/listingBlockQuery";
import React from "react";
import { AppColor } from "types";

import { ArticleCard } from "./Card/ArticleCard";
import Card from "./Card/Card";
import ListCard from "./Card/ListCard";

interface ListProps {
  items: ListingBlockItem[];
  variation?: null | "list" | "grid";
}

const List: React.FC<ListProps> = (props) => {
  const { items, variation } = props;

  return (
    <div className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 ">
      {items.map((item, index) => {
        if (item._type === "article") {
          //@ts-ignore
          return <ArticleCard key={item._id || item._key} {...item} />;
        }
        return (
          <ListCard
            variation={variation}
            key={item._id || item._key}
            {...item}
          />
        );
      })}
    </div>
  );
};

export default List;
