import Kreisel from "@components/Kreisel";
import Typo from "@components/Typography/Typography";
import { PlugProps } from "@lib/SanityPageBuilder/lib/RichText";
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
    <>
      <div className="grid grid-cols-1  gap-3 mb-3 ">
        {scrapeEvents &&
          scrapeEvents
            .filter((i) =>
              hasInfoTag ? i.name?.includes("Info-Nachmittag") : true
            )
            .map((item, index) => {
              const month = item.start && item.start.slice(3, 5);
              let isNewMonth = false;
              if (saveMonth !== month) {
                isNewMonth = true;
                saveMonth = month;
              }

              return (
                <>
                  {isNewMonth && groupByMonth && (
                    <div className="col-span-full font-bold">
                      {month && monthMap[month]}
                    </div>
                  )}
                  <ScrapeEventItem key={index} {...item} />
                </>
              );
            })}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-3 mb-3 ">
        {items && items.map((i, index) => <EventItem key={index} {...i} />)}
      </div> */}
    </>
  );
};

export default EventPlug;

const EventItem: React.FC<IEventItem> = (props) => {
  const { eventItems, title, multi, description } = props;

  const hasItems = eventItems && eventItems.length > 0;
  const hasMultiple = eventItems && eventItems.length > 1;

  if (!multi && hasItems) {
    return (
      <EventWrap>
        <Event {...eventItems[0]} isSub={false} />
      </EventWrap>
    );
  }
  return (
    <EventWrap>
      <div className="w-full">
        <Typo bold>{title}</Typo>
        {description && (
          <Typo className=" whitespace-pre-line bg-secondary  p-4 mb-4  rounded-theme">
            {description}
          </Typo>
        )}
        {eventItems &&
          eventItems.map((i, index) => (
            <Event key={index} {...i} isSub={true} />
          ))}
      </div>
    </EventWrap>
  );
};

const Event: React.FC<IEvent> = (props) => {
  const { title, startDate, endDate, isSub, description } = props;
  const bookingStatus = "open";
  return (
    <>
      <div className="flex justify-between ">
        <div className="flex  justify-center items-center mb-3">
          <Kreisel
            className={clsx("h-6 w-6 rounded-full  mr-2 ", {
              "text-green-400  ": bookingStatus === "open",
              // "text-red ": bookingStatus === "full",
              // "text-yellow-400 ": bookingStatus === "medium",
            })}
          />
          <Typo variant="body-s" space={false}>
            online
          </Typo>
        </div>
        <Typo variant="body-s">{parseDate({ startDate, endDate })}</Typo>
      </div>

      <Typo bold>{title}</Typo>
      {/* <Typo space={false}>{item.referent}</Typo> */}
    </>
  );
};

type parseDateProps = {
  startDate?: string | null;
  endDate?: string | null;
};
const parseDate = (props: parseDateProps) => {
  const { startDate, endDate } = props;
  const _startDate = startDate && new Date(startDate);
  const _endDate = endDate && new Date(endDate);

  if (_startDate && _endDate) {
    const parsedStartDate = _startDate.toLocaleDateString("de");
    const parsedEndDate = _endDate.toLocaleDateString("de");
    const parsedStartTime = _startDate.toLocaleTimeString("de").slice(0, 5);
    const parsedEndTime = _endDate.toLocaleTimeString("de").slice(0, 5);
    const isSameDate = parsedStartDate === parsedEndDate;
    if (isSameDate) {
      return `${parsedStartDate} ${parsedStartTime}-${parsedEndTime}`;
    }
    return `${parsedStartDate}/${parsedStartTime} - ${parsedEndDate}/${parsedEndTime}`;
  }
  return "";
};
