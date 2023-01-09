import clsx from "clsx";
import React from "react";

type EventWrapProps = {
  href?: string;
  bookingStatus?: string;
  className?: string;
};
export const EventWrap: React.FC<EventWrapProps> = (props) => {
  const { children, href, bookingStatus, className } = props;

  // const className = clsx(
  //   "bg-grey-light p-4 rounded-theme  justify-between   transition-shadow hover:shadow-md",
  //   {
  //     "border-green-400  ": bookingStatus === "open",
  //     "border-red ": bookingStatus === "full",
  //     "border-yellow-400 ": bookingStatus === "medium",
  //   }
  // );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
};
