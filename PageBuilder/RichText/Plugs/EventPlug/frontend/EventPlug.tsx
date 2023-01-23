import { ScrapeEventItem } from "./ScrapeEventItem";
import { IEventPlugProps } from "../eventPlug.query";
import { PlugProps } from "lib/SanityPageBuilder/lib/RichText";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import React, { useEffect, useState, useCallback } from "react";

const EventPlug: React.FC<PlugProps<IEventPlugProps>> = (props) => {
  const { filter } = props.node;

  const [scrapeEvents, setScrapeEvents] = useState<null | ScrapeEvent[]>(null);
  const [loading, setLoading] = useState(true);

  const filterItems = useCallback(() => {
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
  }, [filter, scrapeEvents]);

  useEffect(() => {
    fetch("/api/scrapeEvents")
      .then((data) => data.json())
      .then((n) => {
        if (n.data) {
          setScrapeEvents(n.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 mb-3">
      {filterItems().map((item, index) => {
        return <ScrapeEventItem key={item.link} {...item} />;
      })}
    </div>
  );
};

export default EventPlug;
