import { ConditionalLink } from "components/Link";
import { LinkResult } from "PageBuilder/Navigation/query";
import React from "react";

const CardWrap: React.FC<{
  href?: string;
  className?: string;
  link?: LinkResult;
  children?: React.ReactNode;
}> = (props) => {
  const { children, href, className, link } = props;

  const _href = href || link?.href;

  return (
    <ConditionalLink
      condition={!!_href}
      external={link?.external}
      className={`overflow-hidden  rounded-theme shrink-0    max-w-sm mx-auto ${className}`}
      href={_href || "/"}
    >
      {children}
    </ConditionalLink>
  );
};

export default CardWrap;
