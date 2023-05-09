import { ScrapeEvent } from "./appDirect/scrapeEvents";

export const scrapeEventsFilter = (
  scrapeEvents: ScrapeEvent[],
  filter: string
) => {
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
};
