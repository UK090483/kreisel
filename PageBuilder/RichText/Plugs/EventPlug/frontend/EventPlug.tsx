import { ScrapeEventItem, ScrapeEventPlaceholder } from "./ScrapeEventItem";
import fetchEvents from "./scrapeEvents";
import { IEventPlugProps } from "../eventPlug.query";

import React, { Suspense } from "react";

const EventPlugComponent = async (props: IEventPlugProps) => {
  const scrapeEvents = await fetchEvents();
  const { filter } = props;
  const filterItems = () => {
    if (!scrapeEvents) {
      return [];
    }
    if (!scrapeEvents || !filter) {
      return scrapeEvents;
    }
    const filterList = filter.split(",").map((i) => i.trim().toLowerCase());
    return scrapeEvents.filter((i) => {
      if (!i.name) {
        return false;
      }
      const title = i.name.toLowerCase();
      return filterList.find((f) => title.includes(f));
    });
  };

  return (
    <div className="mb-3 grid grid-cols-1 gap-3">
      {filterItems().map((item, index) => {
        return <ScrapeEventItem key={item.link} {...item} />;
      })}
    </div>
  );
};

const EventPlug: React.FC<IEventPlugProps> = (props) => {
  return (
    <Suspense fallback={<ScrapeEventPlaceholder />}>
      {/* @ts-expect-error Async Server Component */}
      <EventPlugComponent {...props} />
    </Suspense>
  );
};

export default EventPlug;
