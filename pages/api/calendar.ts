// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import icsToJson from "ics-to-json";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://calendar.google.com/calendar/ical/u9603t33bf5i5e79c4pjelvcn4%40group.calendar.google.com/public/basic.ics";

  const blob = await fetch(url);
  const text = await blob.text();
  const data = icsToJson(text);

  res.status(200).json({ data });
}
