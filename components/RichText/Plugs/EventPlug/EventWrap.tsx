import clsx from "clsx";
import React from "react";

type EventWrapProps = {
  href?: string;
  bookingStatus?: string;
};
export const EventWrap: React.FC<EventWrapProps> = (props) => {
  const { children, href, bookingStatus } = props;

  const className = clsx(
    "bg-grey-light p-6 rounded-theme flex flex-col justify-between border-primary-light border-2 transition-shadow hover:shadow-2xl",
    {
      "border-green-400  ": bookingStatus === "open",
      "border-red ": bookingStatus === "full",
      "border-yellow-400 ": bookingStatus === "medium",
    }
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
};
