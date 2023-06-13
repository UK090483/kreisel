import EventItem from "./EventItem";
import clsx from "clsx";

import React from "react";

export type Event = {
  link?: string;
  referent?: string;
  name?: string;
  ort?: string;
  duration?: string;
  start?: string;
  end?: string;
  bookingStatus?: string;
  loading?: boolean;
  index?: number;
};

const EventPlugComponent: React.FC<{ events: Event[]; loading?: boolean }> = ({
  events,
  loading,
}) => {
  const _events = loading
    ? Array.from({ length: 10 }).map((_i, index) => ({
        link: index + "item",
        loading: true,
        index,
      }))
    : events;

  if (_events?.length === 0)
    return (
      <div className=" text-lg text-center">
        es sind zur zeit keine Veranstaltungen geplant
      </div>
    );
  return (
    <div className="relative">
      <Panel />
      <div className="mb-3 grid grid-cols-1 gap-3 max-h-[500px] overflow-scroll py-10">
        {_events.map((item) => {
          return <EventItem key={item.link} {...item} />;
        })}
      </div>
      <Panel bottom />
    </div>
  );
};

const Panel = ({ bottom }: { bottom?: boolean }) => (
  <div
    className={clsx(
      "absolute left-0 right-0 h-12 w-full from-white to-transparent ",
      {
        "bottom-0 bg-gradient-to-t ": bottom,
        "top-0 bg-gradient-to-b ": !bottom,
      }
    )}
  ></div>
);

export default EventPlugComponent;
