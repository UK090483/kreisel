import { ConditionalLink } from "components/Atoms/Link";
import React from "react";

const CardWrap: React.FC<{
  href?: string;
  className?: string;

  children?: React.ReactNode;
}> = (props) => {
  const { children, className, href } = props;

  return (
    <ConditionalLink
      condition={!!href}
      href={href}
      className={`mx-auto max-w-sm shrink-0 overflow-hidden rounded-theme ${className}`}
    >
      {children}
    </ConditionalLink>
  );
};

export default CardWrap;
