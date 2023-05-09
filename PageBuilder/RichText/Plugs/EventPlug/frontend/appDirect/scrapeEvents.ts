// X01 à Seminare Hamburg
// X02 à Seminare Heidelberg
// X03 à Infoveranstaltungen
// X04 à Supervision
// X05 à Online-Seminare
// X06 à Lehrgänge

export type ScrapeEvent = {
  link?: string;
  referent?: string;
  name?: string;
  ort?: string;
  duration?: string;
  start?: string;
  end?: string;
  bookingStatus?: string;
};

// eslint-disable-next-line import/no-unused-modules
export default async function getData() {
  const fetchResult = await fetch(`http://localhost:3000/api/scrapeEvents`);
  const data = await fetchResult.json();
  return data.data;
}
