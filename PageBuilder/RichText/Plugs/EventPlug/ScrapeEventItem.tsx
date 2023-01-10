import { PureKreisel } from "components/Kreisel";
import Typo from "components/Typography/Typography";
import clsx from "clsx";
import { ScrapeEvent } from "pages/api/scrapeEvents";
import React from "react";
import { EventWrap } from "./EventWrap";
const url = "https://www.kcs4web.de/kcs4webhcm/";

export const ScrapeEventItem: React.FC<ScrapeEvent> = (item) => {
  const { bookingStatus, ort, start } = item;

  return (
    <EventWrap
      className="bg-grey-light rounded-theme  justify-between p-2 items-center  transition-shadow hover:shadow-md grid md:grid-cols-[minmax(120px,auto)_1fr_100px] "
      bookingStatus={item?.bookingStatus}
      href={url + item.link}
    >
      <div className={clsx("flex justify-start items-center h-fit ")}>
        <PureKreisel
          className={clsx("h-6 w-6 rounded-full  mr-2 ", {
            "text-green-400  ": bookingStatus === "open",
            "text-red ": bookingStatus === "full",
            "text-yellow-400 ": bookingStatus === "medium",
          })}
        />
        <div>
          <Typo variant="body-s" bold space={false}>
            {start}
          </Typo>
          <Typo className="pt-1" variant="body-s" space={false}>
            {ort}
          </Typo>
        </div>
      </div>

      <div className=" h-fit w-full ">
        <Typo space={false} className=" leading-none">
          {item.name}
        </Typo>
      </div>

      <Typo variant="body-s" className=" " space={false}>
        {item.referent}
      </Typo>
    </EventWrap>
  );
};
