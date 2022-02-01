import React from "react";
import Card from "./Card";

import Typo from "@components/Typography/Typography";
import Button from "@components/Button/Button";
import { useShop } from "@services/ShopService/shopContext";
import { IArticleCardResult } from "@components/Blocks/listingBlock/listingBlockQuery";

type ArticleCardProps = {} & IArticleCardResult;

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
