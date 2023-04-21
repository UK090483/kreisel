import { ConditionalLink } from "components/Link";
import { LinkResult } from "PageBuilder/Navigation/navigation.query";
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
      className={`mx-auto max-w-sm shrink-0 overflow-hidden rounded-theme ${className}`}
      href={_href || "/"}
    >
      {children}
    </ConditionalLink>
  );
};

export default CardWrap;
