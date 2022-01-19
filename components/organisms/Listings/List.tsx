import { ListingBlockItem } from "@components/Blocks/listingBlock/ListingsBlock";
import React from "react";
import { AppColor } from "types";

import { ArticleCard } from "./Card/ArticleCard";
import Card from "./Card/Card";

import { Grid } from "./Grid";

interface ListProps {
  items: ListingBlockItem[];
  bgColor?: AppColor;
}

const List: React.FC<ListProps> = (props) => {
  const { items, bgColor } = props;

  return (
    <div className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 ">
      {items.map((item, index) => {
        if (item._type === "article") {
          //@ts-ignore
          return <ArticleCard key={item._id || item._key} {...item} />;
        }
        return (
          <Card
            key={item._id || item._key}
            {...item}
            title={`(${item._type})  ${item.title}`}
          />
        );
      })}
    </div>
  );
};

export default List;
