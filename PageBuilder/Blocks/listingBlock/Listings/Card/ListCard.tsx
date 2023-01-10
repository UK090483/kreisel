import CardWrap from "./CardWrap";
import { CardResult } from "../../listingBlockQuery";
import Typo from "components/Typography";
import Kreisel from "components/Kreisel";
import BlockContent from "@sanity/block-content-to-react";
import React from "react";

type CardProps = {
  variation?: null | "list" | "grid";
  children?: React.ReactNode;
} & CardResult;

const ListCard: React.FC<CardProps> = (props) => {
  const {
    children,
    href,
    title,
    _createdAt,
    description,
    link,
    variation,
    image,
  } = props;

  const _description = Array.isArray(description) ? (
    <BlockContent blocks={description} />
  ) : (
    description
  );

  return (
    <CardWrap
      href={href}
      link={link}
      className=" rounded-theme bg-grey-light  shadow-sm hover:shadow-2xl transition-shadow  w-full py-6 border-primary border-[1px]"
    >
      <div className=" flex items-center w-full ">
        <div className="w-14 m-6 flex-shrink-0">
          <Kreisel />
        </div>
        <div className="  w-full ">
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
