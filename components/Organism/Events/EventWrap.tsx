import React from "react";

type EventWrapProps = {
  href?: string;
  bookingStatus?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const EventWrap: React.FC<React.PropsWithChildren<EventWrapProps>> = (
  props
) => {
  const { children, href, bookingStatus, className, style } = props;

  if (href) {
    return (
      <a
        style={style}
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
};
