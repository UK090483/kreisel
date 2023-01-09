import React from "react";

import Typo from "@components/Typography";
import SanityImage from "@lib/SanityImage";
import CardWrap from "./CardWrap";
import CardBody from "./CardBody";
import { CardResult } from "../../listingBlockQuery";
import BlockContent from "@sanity/block-content-to-react";

type CardProps = {
  variation?: null | "list" | "grid";
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
    <CardWrap link={link} href={href} className=" shadow-xl w-full">
      <div
        className={`relative w-full   aspect-w-10 aspect-h-5 rounded-t-theme overflow-hidden bg-primary-light `}
      >
        {image && <SanityImage image={image} objectFit="cover" />}
      </div>

      <CardBody className={`bg-white  h-full`}>
        {_createdAt && (
          <Typo className="pb-2" variant="body">
            {paresDate(_createdAt)}
          </Typo>
        )}
        {title && <Typo variant="body-l">{title}</Typo>}
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
