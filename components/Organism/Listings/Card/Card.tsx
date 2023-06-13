/* eslint-disable jsx-a11y/alt-text */
import CardWrap from "./CardWrap";
import CardBody from "./CardBody";

import Image, { ImageSrc } from "components/Atoms/Image";
import { LinkSource } from "components/Atoms/Link";
import Typo from "components/Atoms/Typography";

import Content, {
  ContentSource,
  validateContentSource,
} from "components/Atoms/Content";
import React from "react";

export type CardProps = {
  href?: string;
  title?: string;
  description?: ContentSource | string;
  image?: ImageSrc;
  link?: LinkSource;
  _createdAt?: string;
  _id: string;
  _key?: string;
  _type?: string;
};

const Card: React.FC<CardProps & { children?: React.ReactNode }> = (props) => {
  const { children, href, title, link, _createdAt, description, image } = props;

  const _description = validateContentSource(description) ? (
    <Content content={description} />
  ) : (
    description
  );

  return (
    <CardWrap href={href} className=" w-full shadow-theme ">
      <div
        className={`aspect-w-10 aspect-h-5 relative w-full overflow-hidden rounded-t-theme bg-primary-light `}
      >
        <Image src={image} fill className=" object-cover " />
      </div>

      <CardBody className={`h-full bg-white`}>
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

        {validateContentSource(description) ? (
          <Content content={description} />
        ) : (
          <Typo>{description as string}</Typo>
        )}

        {children}
      </CardBody>
    </CardWrap>
  );
};

export default Card;

const paresDate = (d: string) => {
  return new Date(d).toLocaleDateString("de");
};
