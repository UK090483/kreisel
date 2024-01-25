// import fetchEvents from "./scrapeEvents";

// import { IEventPlugProps } from "../../eventPlug.query";

// import { Events } from "components";
// import React, { Suspense } from "react";

// const url = "https://www.kcs4web.de/kcs4webhcm/";

// const EventPlugApp = async (props: IEventPlugProps) => {
//   const scrapeEvents = await fetchEvents();
//   const { filter } = props;

//   return <Events filter={filter} />;
// };

// const EventPlug: React.FC<IEventPlugProps> = (props) => {
//   return (
//     <Suspense fallback={".... Loading"}>
//       {/* @ts-expect-error Async Server Component */}
//       <EventPlugApp {...props} />
//     </Suspense>
//   );
// };

// export default EventPlug;
