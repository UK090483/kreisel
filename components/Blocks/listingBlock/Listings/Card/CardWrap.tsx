import React from "react";
import { ConditionalLink } from "@components/Link";

const CardWrap: React.FC<{ href?: string; className?: string }> = ({
  children,
  href,
  className,
}) => {
  return (
    <ConditionalLink
      condition={!!href}
      className={`overflow-hidden  rounded-theme shrink-0    max-w-sm mx-auto ${className}`}
      href={href || "/"}
    >
      {children}
    </ConditionalLink>
  );
};

export default CardWrap;
