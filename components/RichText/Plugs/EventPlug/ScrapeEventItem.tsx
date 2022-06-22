import Typo from "@components/Typography/Typography";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import React from "react";
import EventHead from "./EventHead";
import { EventWrap } from "./EventWrap";
const url = "https://www.kcs4web.de/kcs4webhcm/";

export const ScrapeEventItem: React.FC<ScrapeEvent> = (item) => {
  return (
    <EventWrap bookingStatus={item?.bookingStatus} href={url + item.link}>
      <EventHead
        bookingStatus={item?.bookingStatus}
        location={item.ort}
        date={
          item.start === item.end ? item.end : item.start + " - " + item.end
        }
      />
      <div className="flex justify-between">
        <Typo bold space={false}>
          {item.name}
        </Typo>
        <Typo space={false}>{item.referent}</Typo>
      </div>
    </EventWrap>
  );
};
