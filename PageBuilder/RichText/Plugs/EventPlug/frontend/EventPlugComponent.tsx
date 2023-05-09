import { ScrapeEventItem } from "./ScrapeEventItem";
import { ScrapeEvent } from "./appDirect/scrapeEvents";

import React from "react";

const EventPlugComponent = ({
  scrapeEvents,
}: {
  scrapeEvents: ScrapeEvent[];
}) => {
  return (
    <div className="mb-3 grid grid-cols-1 gap-3">
      {scrapeEvents.map((item) => {
        return <ScrapeEventItem key={item.link} {...item} />;
      })}
    </div>
  );
};

export default EventPlugComponent;
