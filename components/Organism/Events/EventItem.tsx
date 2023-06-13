import { EventWrap } from "./EventWrap";
import { Event } from "./Events";
import { PureKreisel } from "components/Atoms/Kreisel";
import Typo from "components/Atoms/Typography/Typography";
import clsx from "clsx";

const EventItem: React.FC<Event> = (item) => {
  const { bookingStatus, ort, start, link, loading, index } = item;

  return (
    <EventWrap
      style={{ animationDelay: index ? index * 70 + "ms" : "0" }}
      className={clsx(
        "bg-grey-light rounded-theme justify-between p-2 items-center transition-shadow hover:shadow-md grid gap-4 md:grid-cols-[minmax(120px,auto)_1fr_100px]",
        { "animate-pulse": loading }
      )}
      bookingStatus={item?.bookingStatus}
      href={link}
    >
      <div className={clsx("flex justify-start items-center h-fit")}>
        <PureKreisel
          style={{ animationDelay: index ? index * 10 + "ms" : "0" }}
          className={clsx("h-6 w-6 rounded-full mr-2", {
            "text-green-400  ": bookingStatus === "open",
            "text-red ": bookingStatus === "full",
            "text-yellow-400 ": bookingStatus === "medium",
            "animate-spin": loading,
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

export default EventItem;
