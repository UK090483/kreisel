import Kreisel from "components/Kreisel";
import Typo from "components/Typography/Typography";
import { PlugProps } from "lib/SanityPageBuilder/lib/RichText";
import clsx from "clsx";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import React, { useEffect, useState } from "react";
import { EventWrap } from "./EventWrap";
import { ScrapeEventItem } from "./ScrapeEventItem";

interface IEvent {
  title?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isSub?: boolean;
}
export interface IEventItem {
  eventItems: IEvent[];
  title?: string | null;
  multi?: boolean;
  description?: string | null;
}
interface IEventPlugProps {
  items?: IEventItem[];
  includeTags?: { title?: string; _id: string }[];
  groupByMonth?: boolean;
}
export const EventPlugQuery = `
  _type == "eventPlug" => {
  ...,
  'includeTags':includeTags[]->{...},
   'items': *[_type == 'event' && references(^.includeTags[]._ref) ] | order(eventItems[0].startDate asc)[] {...}
  }
  `;

let saveMonth: string | null | undefined = null;

const monthMap: { [k: string]: string } = {
  "01": "Januar",
  "02": "Februar",
  "03": "März",
  "04": "April",
  "05": "Mai",
  "06": "Juni",
  "07": "Juli",
  "08": "August",
  "09": "September",
  "10": "Oktober",
  "11": "November",
  "12": "Dezember",
};

const EventPlug: React.FC<PlugProps<IEventPlugProps>> = (props) => {
  const { items, includeTags, groupByMonth = false } = props.node;

  const [scrapeEvents, setScrapeEvents] = useState<null | ScrapeEvent[]>(null);
  const [loading, setLoading] = useState(true);

  const hasInfoTag = !!includeTags?.find(
    (i) => i._id === "0440e2ff-e92f-4ba9-9f2d-b29c32984c45"
  );

  useEffect(() => {
    fetch("/api/scrapeEvents")
      .then((data) => data.json())
      .then((n) => {
        n.data && setScrapeEvents(n.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1  gap-3 mb-3 ">
      {scrapeEvents &&
        scrapeEvents
          .filter((i) =>
            hasInfoTag ? i.name?.includes("Info-Nachmittag") : true
          )
          .map((item, index) => {
            return <ScrapeEventItem key={item.link} {...item} />;
          })}
    </div>
  );
};

export default EventPlug;
