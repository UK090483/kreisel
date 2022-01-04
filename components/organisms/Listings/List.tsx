import { ListingBlockItem } from "@services/pageBuilderService/Blocks/listingBlock/ListingsBlock";
import React from "react";
import { ArticleCard } from "./Card/ArticleCard";
import Card from "./Card/Card";

import { Grid } from "./Grid";

interface ListProps {
  items: ListingBlockItem[];
}

const List: React.FC<ListProps> = (props) => {
  const { items } = props;

  return (
    <Grid>
      {items.map((item, index) => {
        if (item._type === "article") {
          return <ArticleCard key={item._id} {...item} />;
        }
        return <Card key={item._id} {...item} />;
      })}
    </Grid>
  );
};

export default List;
