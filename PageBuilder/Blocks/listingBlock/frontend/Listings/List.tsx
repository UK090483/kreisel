import { ArticleCard } from "./Card/ArticleCard";
import Card from "./Card/Card";
import ListCard from "./Card/ListCard";
import {
  CardResult,
  ListingBlockProps,
} from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import React from "react";

interface ListProps {
  items: CardResult[];
}

const List: React.FC<ListProps & ListingBlockProps> = (props) => {
  const { items, variant } = props;

  return (
    <div className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 ">
      {items.map((item, index) => {
        if (item._type === "article") {
          //@ts-ignore
          return <ArticleCard key={item._id || item._key} {...item} />;
        }

        if (variant === "smallCard") {
          return (
            <ListCard
              variation={"list"}
              key={item._id || item._key}
              {...item}
            />
          );
        }
        return <Card key={item._id || item._key} {...item} />;
      })}
    </div>
  );
};

export default List;
