import React from "react";

type EventWrapProps = {
  href?: string;
  bookingStatus?: string;
  className?: string;
};
export const EventWrap: React.FC<React.PropsWithChildren<EventWrapProps>> = (
  props
) => {
  const { children, href, bookingStatus, className } = props;

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
};
