import CardWrap from "./CardWrap";
import CardBody from "./CardBody";
import { CardResult } from "../../../listingBlock.query";

import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import Typo from "components/Typography";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";

type CardProps = {
  variation?: null | "list" | "grid";
  children?: React.ReactNode;
} & CardResult;

const Card: React.FC<CardProps> = (props) => {
  const {
    children,
    href,
    title,
    link,
    _createdAt,
    description,
    variation,
    image,
  } = props;

  const _description = Array.isArray(description) ? (
    <BlockContent blocks={description} />
  ) : (
    description
  );

  return (
    <CardWrap link={link} href={href} className=" w-full shadow-xl">
      <div
        className={`aspect-w-10 aspect-h-5   relative w-full overflow-hidden rounded-t-theme bg-primary-light `}
      >
        {image && <SanityImage src={image} fill className=" object-cover " />}
      </div>

      <CardBody className={`h-full  bg-white`}>
        {_createdAt && (
          <Typo className="pb-2" variant="body">
            {paresDate(_createdAt)}
          </Typo>
        )}
        {title && (
          <Typo space={false} className="pb-2 font-semibold">
            {title}
          </Typo>
        )}
        {description && <Typo>{_description}</Typo>}
        {children}
      </CardBody>
    </CardWrap>
  );
};

export default Card;

const paresDate = (d: string) => {
  return new Date(d).toLocaleDateString("de");
};
