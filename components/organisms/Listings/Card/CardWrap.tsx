import React from "react";
import { ConditionalLink } from "@components/Link";

const CardWrap: React.FC<{ href?: string }> = ({ children, href }) => {
  return (
    <ConditionalLink
      condition={!!href}
      className=" w-full overflow-hidden bg-white rounded-3xl shadow-2xl max-w-sm mx-auto"
      href={href || "/"}
    >
      {children}
    </ConditionalLink>
  );
};

export default CardWrap;
