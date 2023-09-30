"use client";
import EventItem from "./EventItem";
import StatusIndicator from "./StatusIndicator";
import { Dropdown } from "components/Molecules/Inputs/Dropdown";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import clsx from "clsx";
import React, { useState } from "react";
import useSWR from "swr";

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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const EventPlugComponent: React.FC<{
  pricing?: null | any;
  legende?: null | boolean;
  showFilter?: null | boolean;
  category?: string;
  filter?: string;
}> = ({ pricing, legende, showFilter, category, filter }) => {
  let url = `/api/scrapeEvents`;
  const [cat, setCat] = useState<string | undefined>();

  const _cat = cat || category;

  const searchParams = new URLSearchParams();

  if (_cat) {
    searchParams.delete("cat");
    searchParams.append("cat", _cat);
  }
  if (filter) {
    searchParams.append("filter", encodeURIComponent(filter));
  }

  if (Boolean(searchParams.size)) {
    url += "?" + searchParams.toString();
  }

  const { data, error, isLoading } = useSWR<{ data: ScrapeEvent[] }>(
    url,
    fetcher
  );

  const handleFilterChange: React.ComponentProps<
    typeof Dropdown
  >["onChange"] = (e) => {
    //@ts-ignore
    setCat((c) => (c === e.value ? undefined : e.value));
  };

  const _events = isLoading
    ? Array.from({ length: 10 }).map((_i, index) => ({
        link: index + "item",
        loading: true,
        index,
      }))
    : data?.data || [];

  return (
    <>
      {showFilter && (
        <Dropdown
          multiple={false}
          placeHolder="Kategorie"
          value={cat}
          name="Bla"
          items={[
            { title: "Hamburg", value: "X01" },
            { title: "Heidelberg", value: "X02" },
            { title: "Info-Veranstaltung", value: "X03" },
            { title: "Supervision", value: "X04" },
            { title: "Online-Seminare", value: "X05" },
            { title: "Lehrgänge", value: "X06" },
          ]}
          onChange={handleFilterChange}
        />
      )}
      <div className="relative">
        <Panel />

        <div className="mb-3 grid grid-cols-1 gap-3 max-h-[500px] overflow-scroll py-10">
          {_events?.length === 0 && (
            <div className="text-lg text-center">
              Neue Veranstaltungen sind in Planung.
            </div>
          )}
          {_events.map((item) => {
            return <EventItem key={item.link} {...item} />;
          })}
        </div>

        <Panel bottom />
      </div>
      {!!legende && <Legende />}
    </>
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

const Legende = () => {
  return (
    <div className="text-sm leading-4 flex flex-col sm:flex-row  sm:items-center gap-3">
      <div className="flex items-center">
        <StatusIndicator state="open" size="s" /> <p>freie Plätze verfügbar</p>
      </div>
      <div className="flex items-center">
        <StatusIndicator state="medium" size="s" />{" "}
        <p> wenige Plätze verfügbar</p>
      </div>
      <div className="flex items-center">
        <StatusIndicator state="full" size="s" /> <p> keine Plätze verfügbar</p>
      </div>
    </div>
  );
};
