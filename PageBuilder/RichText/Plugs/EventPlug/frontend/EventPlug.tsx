"use client";

import { IEventPlugProps } from "../eventPlug.query";
import { Events } from "components";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import useSWR from "swr";
import React from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const EventPlug: React.FC<IEventPlugProps> = (props) => {
  let url = `/api/scrapeEvents`;
  const { category, filter } = props;

  const searchParams = new URLSearchParams();

  if (category) {
    searchParams.append("cat", category);
  }
  if (filter) {
    searchParams.append("filter", filter);
  }

  if (Boolean(searchParams.size)) {
    url += "?" + searchParams.toString();
  }

  const { data, error, isLoading } = useSWR<{ data: ScrapeEvent[] }>(
    url,
    fetcher
  );

  return <Events events={data?.data || []} loading={isLoading} />;
};

export default EventPlug;
