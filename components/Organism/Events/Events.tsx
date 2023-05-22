import { ScrapeEventItem } from "./EventItem";

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
};

const EventPlugComponent: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className="mb-3 grid grid-cols-1 gap-3">
      {events.map((item) => {
        return <ScrapeEventItem key={item.link} {...item} />;
      })}
    </div>
  );
};

export default EventPlugComponent;
