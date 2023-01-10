import React from "react";
import { ConditionalLink } from "components/Link";
import { LinkResult } from "PageBuilder/Navigation/query";

const CardWrap: React.FC<{
  href?: string;
  className?: string;
  link?: LinkResult;
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
