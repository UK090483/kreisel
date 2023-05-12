import { LinkProps } from "components/Atoms/Link";
import { LinkResult } from "PageBuilder/Navigation/navigation.query";
import React, { PropsWithChildren } from "react";
import NextLink from "next/link";

export type LinkSource = LinkResult;

const LinkAdapter: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  className,
  onClick,
  href,
  external,
}) => {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <NextLink
      onClick={onClick}
      data-testid="nextLink"
      href={href || "/"}
      passHref
      className={className}
    >
      {children}
    </NextLink>
  );
};

export default LinkAdapter;
