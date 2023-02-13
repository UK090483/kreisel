import CardWrap from "./CardWrap";
import { CardResult } from "../../../listingBlock.query";
import Typo from "components/Typography";
import Kreisel from "components/Kreisel";
import React from "react";

type CardProps = {
  children?: React.ReactNode;
} & CardResult;

const ListCard: React.FC<CardProps> = (props) => {
  const { href, title, description, link } = props;

  return (
    <CardWrap
      href={href}
      link={link}
      className="rounded-theme bg-grey-light  shadow-sm hover:shadow-2xl transition-shadow  w-full py-4 md:py-8 border-primary border-[1px]"
    >
      <div className=" flex items-center w-full h-full ">
        <div className="w-14 mx-3 flex-shrink-0">
          <Kreisel />
        </div>
        <div className="  w-full pr-2">
          {title && (
            <Typo space={false} variant="body-l">
              {title}
            </Typo>
          )}
        </div>
      </div>
    </CardWrap>
  );
};

export default ListCard;
