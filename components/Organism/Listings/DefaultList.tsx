// import { ArticleCard } from "./Card/ArticleCard";
import Card, { CardProps } from "./Card/Card";
import SmallCard from "./Card/SmallCard";

import React from "react";

interface ListProps {
  items: CardProps[];
  variant?: string;
}

const DefaultList: React.FC<ListProps> = (props) => {
  const { items, variant } = props;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
      {items.map((item) => {
        // if (item._type === "article") {
        //   //@ts-ignore
        //   return <ArticleCard key={item._id || item._key} {...item} />;
        // }

        if (variant === "smallCard") {
          return <SmallCard key={item._id || item._key} {...item} />;
        }
        return <Card key={item._id || item._key} {...item} />;
      })}
    </div>
  );
};

export default DefaultList;
