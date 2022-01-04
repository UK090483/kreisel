import React from "react";

import Typo from "@components/Typography";
import { Image } from "@components/Image";

import CardWrap from "./CardWrap";
import CardBody from "./CardBody";
import CardTitle from "./CardTitle";

export interface CardProps {
  href?: string;
  title?: string;
  date?: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  href,
  title,
  date,
  description,
}) => {
  return (
    <CardWrap href={href}>
      <div className="relative w-full aspect-w-16 aspect-h-10 ">
        <Image />
      </div>

      <CardBody>
        {date && (
          <Typo className="pb-2" variant="body">
            {paresDate(date)}
          </Typo>
        )}
        {title && <CardTitle>{title}</CardTitle>}
        {description && <Typo>{description}</Typo>}
        {children}
      </CardBody>
    </CardWrap>
  );
};

export default Card;

const paresDate = (d: string) => {
  return new Date(d).toLocaleDateString("de");
};
