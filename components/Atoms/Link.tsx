import LinkAdapter from "components/Adapter/LinkAdapter";
import React, { PropsWithChildren } from "react";

export type LinkProps = {
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  ...rest
}) => {
  //@ts-ignore
  return <LinkAdapter {...rest}>{children}</LinkAdapter>;
};

export default Link;

export const ConditionalLink: React.FC<
  PropsWithChildren<LinkProps & { condition: boolean }>
> = ({ condition, ...rest }) => {
  if (condition) {
    return <Link {...rest} />;
  }
  return <div className={rest.className}>{rest.children}</div>;
};
