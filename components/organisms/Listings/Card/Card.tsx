import React from "react";

import Typo from "@components/Typography";
import SanityImage from "@privateModules/SanityImage";

import CardWrap from "./CardWrap";
import CardBody from "./CardBody";

import BlockContent, {
  BlockContentProps,
  Serializers,
} from "@sanity/block-content-to-react";
import { ImageMetaResult } from "@privateModules/SanityImage/query";

export interface CardProps {
  href?: string;
  title?: string;
  date?: string;
  description?: string | string[];
  variation?: null | "list" | "grid";
  image?: ImageMetaResult;
}

const Card: React.FC<CardProps> = (props) => {
  const { children, href, title, date, description, variation, image } = props;

  const _description = Array.isArray(description) ? (
    <BlockContent blocks={description} />
  ) : (
    description
  );

  const isList = variation === "list";

  return (
    <CardWrap href={href}>
      <div
        className={`relative w-full     ${
          isList
            ? " aspect-w-4 aspect-h-2  rounded-theme"
            : "aspect-w-3 aspect-h-2 rounded-t-theme"
        } overflow-hidden`}
      >
        <SanityImage image={image} />
      </div>

      <CardBody className={`${isList ? "bg-transparent" : "bg-white"} `}>
        {date && (
          <Typo className="pb-2" variant="body">
            {paresDate(date)}
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
