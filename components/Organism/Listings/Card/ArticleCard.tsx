import Card, { CardProps } from "./Card";

import Typo from "components/Atoms/Typography/Typography";
import Button from "components/Atoms/Button/Button";
import { useShop } from "@services/ShopService/shopContext";
import { IArticleCardResult } from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import React from "react";

type ArticleCardProps = { price?: number } & CardProps;

export const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { price, _id, ...rest } = props;

  const s = useShop();
  const { addArticle, inCart, setCartOpen } = s;
  const _inCart = inCart(_id);

  const handleClick = () => {
    if (!_inCart) {
      return addArticle(_id);
    }
    setCartOpen(true);
  };

  return (
    <Card {...rest} _id={_id}>
      <Typo bold className="text-right ">
        {price} €
      </Typo>
      <Button onClick={handleClick}>
        {_inCart ? "zum Einkaufswagen" : "zum Einkaufswagen"}
      </Button>
    </Card>
  );
};
