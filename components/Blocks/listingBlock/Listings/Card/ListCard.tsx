import React from "react";

import Typo from "@components/Typography";
import SanityImage from "@lib/SanityImage";
import CardWrap from "./CardWrap";
import CardBody from "./CardBody";
import { CardResult } from "../../listingBlockQuery";
import BlockContent from "@sanity/block-content-to-react";
import Kreisel from "@components/Kreisel";

type CardProps = {
  variation?: null | "list" | "grid";
} & CardResult;

const ListCard: React.FC<CardProps> = (props) => {
  const { children, href, title, _createdAt, description, variation, image } =
    props;

  const _description = Array.isArray(description) ? (
    <BlockContent blocks={description} />
  ) : (
    description
  );

  return (
    <CardWrap
      href={href}
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

const paresDate = (d: string) => {
  return new Date(d).toLocaleDateString("de");
};
