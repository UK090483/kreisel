import { PureKreisel as Kreisel } from "@components/Kreisel";
import Typo from "@components/Typography/Typography";
import clsx from "clsx";
import * as React from "react";

interface IEventHeadProps {
  bookingStatus?: string;
  location?: string;
  date?: string;
}

const EventHead: React.FunctionComponent<IEventHeadProps> = (props) => {
  const { bookingStatus, location, date } = props;
  return (
    <div className="flex justify-between">
      <div className="flex  justify-center items-center mb-3">
        <Kreisel
          className={clsx("h-6 w-6 rounded-full  mr-2 ", {
            "text-green-400  ": bookingStatus === "open",
            "text-red ": bookingStatus === "full",
            "text-yellow-400 ": bookingStatus === "medium",
          })}
        />

        <Typo variant="body-s" space={false}>
          {location}
        </Typo>
      </div>
      <Typo variant="body-s">{date}</Typo>
    </div>
  );
};

export default EventHead;
