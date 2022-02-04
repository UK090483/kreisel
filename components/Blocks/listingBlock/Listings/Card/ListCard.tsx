import React from "react";

import Typo from "@components/Typography";
import SanityImage from "@privateModules/SanityImage";
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

  const isList = variation === "list";

  return (
    <CardWrap
      href={href}
      className=" rounded-theme bg-grey-light flex items-center shadow-sm hover:shadow-2xl transition-shadow"
    >
      <div className=" flex items-center ">
        <div className="w-14 m-6">
          <Kreisel />
        </div>
        <div className=" p-8 w-full ">
          {title && (
            <Typo space={false} variant="body-l">
              {title}
            </Typo>
          )}
        </div>
      </div>

      {/* <div
        className={`relative w-full     ${
          isList
            ? " aspect-w-4 aspect-h-2  rounded-theme"
            : "aspect-w-3 aspect-h-2 rounded-t-theme"
        } overflow-hidden`}
      >
        <SanityImage image={image} objectFit="cover" />
      </div>

      <CardBody className={`${isList ? "bg-transparent" : "bg-white"}  h-full`}>
        {_createdAt && (
          <Typo className="pb-2" variant="body">
            {paresDate(_createdAt)}
          </Typo>
        )}
        {title && <Typo variant="body-l">{title}</Typo>}
        {description && <Typo>{_description}</Typo>}
        {children}
      </CardBody> */}
    </CardWrap>
  );
};

export default ListCard;

const paresDate = (d: string) => {
  return new Date(d).toLocaleDateString("de");
};
