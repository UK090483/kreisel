import EventPlugComponent from "./EventPlugComponent";
import { IEventPlugProps } from "../eventPlug.query";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import useSWR from "swr";
import React from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const EventPlug: React.FC<IEventPlugProps> = (props) => {
  const { data, error } = useSWR<{ data: ScrapeEvent[] }>(
    "/api/scrapeEvents",
    fetcher
  );

  if (!data?.data) return null;

  return <EventPlugComponent scrapeEvents={data.data} />;
};

export default EventPlug;
