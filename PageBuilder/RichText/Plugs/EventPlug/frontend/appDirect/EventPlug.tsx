import fetchEvents from "./scrapeEvents";
import { ScrapeEventPlaceholder } from "../ScrapeEventItem";
import { IEventPlugProps } from "../../eventPlug.query";

import EventPlugComponent from "../EventPlugComponent";
import { scrapeEventsFilter } from "../scrapeEventsFilter";
import React, { Suspense } from "react";

const EventPlugApp = async (props: IEventPlugProps) => {
  const scrapeEvents = await fetchEvents();
  const { filter } = props;

  return (
    <EventPlugComponent
      scrapeEvents={scrapeEventsFilter(scrapeEvents, filter || "")}
    />
  );
};

const EventPlug: React.FC<IEventPlugProps> = (props) => {
  return (
    <Suspense fallback={<ScrapeEventPlaceholder />}>
      {/* @ts-expect-error Async Server Component */}
      <EventPlugApp {...props} />
    </Suspense>
  );
};

export default EventPlug;
