import Typo from "@components/Typography/Typography";
import { PlugProps } from "@lib/SanityPageBuilder/lib/RichText";
import React from "react";

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
}
export const EventPlugQuery = `
  _type == "eventPlug" => {
  ...,
   'items': *[_type == 'event' && references(^.includeTags[]._ref) ] | order(eventItems[0].startDate asc)[] {...}
  }
  `;

const EventPlug: React.FC<PlugProps<IEventPlugProps>> = (props) => {
  const { items } = props.node;

  return (
    <div>
      {items && items.map((i, index) => <EventItem key={index} {...i} />)}
    </div>
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

  return (
    <div className="w-full">
      <div className={` flex w-full justify-between ${isSub ? "pl-6" : ""}`}>
        <Typo space={false}>{title}</Typo>
        <Typo space={false}>{parseDate({ startDate, endDate })}</Typo>
      </div>
      {description && (
        <Typo className=" whitespace-pre-line bg-secondary  p-4 mb-4  rounded-theme">
          {description}
        </Typo>
      )}
    </div>
  );
};

const EventWrap: React.FC = ({ children }) => {
  return (
    <div className=" bg-primary-light flex items-center py-4 px-2 mb-4 rounded-theme ">
      {children}
    </div>
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
