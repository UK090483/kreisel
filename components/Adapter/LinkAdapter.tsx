import { LinkProps } from "components/Atoms/Link";
import React, { PropsWithChildren } from "react";
import NextLink from "next/link";

interface LinkSource {
  href: string;
  external?: boolean;
}

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
