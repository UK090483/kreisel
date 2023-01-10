import React, { PropsWithChildren } from "react";

import NextLink from "next/link";
interface LinkProps {
  href: string;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
  className,
  external,
  onClick,
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
      href={href}
      passHref
      className={className}
    >
      {children}
    </NextLink>
  );
};

export const ConditionalLink: React.FC<
  PropsWithChildren<LinkProps & { condition: boolean }>
> = ({ condition, ...rest }) => {
  if (condition) {
    return <Link {...rest} />;
  }

  return <div className={rest.className}>{rest.children}</div>;
};
