import { EventWrap } from "./EventWrap";
import { Event } from "./Events";
import { PureKreisel } from "components/Atoms/Kreisel";
import Typo from "components/Atoms/Typography/Typography";
import clsx from "clsx";

export const ScrapeEventItem: React.FC<Event> = (item) => {
  const { bookingStatus, ort, start, link } = item;

  return (
    <EventWrap
      className="bg-grey-light rounded-theme justify-between p-2 items-center transition-shadow hover:shadow-md grid gap-4 md:grid-cols-[minmax(120px,auto)_1fr_100px]"
      bookingStatus={item?.bookingStatus}
      href={link}
    >
      <div className={clsx("flex justify-start items-center h-fit")}>
        <PureKreisel
          className={clsx("h-6 w-6 rounded-full mr-2", {
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

export const EventPlaceholder: React.FC = () => {
  const item = (
    <EventWrap className="bg-grey-light rounded-theme  justify-between p-2 items-center  transition-shadow hover:shadow-md grid gap-4 md:grid-cols-[minmax(120px,auto)_1fr_100px] ">
      <div className={clsx("flex justify-start items-center h-fit ")}>
        <PureKreisel className={clsx("h-6 w-6 rounded-full  mr-2 ", {})} />
        <div></div>
      </div>

      <div className=" h-fit w-full "></div>
    </EventWrap>
  );
  return (
    <div className=" flex  flex-col gap-2">
      {item}
      {item}
      {item}
      {item}
      {item}
    </div>
  );
};
