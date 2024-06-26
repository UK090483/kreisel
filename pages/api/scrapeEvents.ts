import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";

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

const url = `https://www.kcs4web.de/kcs4webhcm/`;

const filterItems = (filter: string, items: ScrapeEvent[]) => {
  if (!items) {
    return [];
  }
  if (!filter) {
    return items;
  }
  const filterList = decodeURIComponent(filter)
    .split(",")
    .map((i) => i.trim().toLowerCase());

  return items.filter((i) => {
    if (!i.name) {
      return false;
    }
    const title = i.name.toLowerCase();

    return filterList.find((f) => title.includes(f));
  });
};
// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const category =
    typeof req.query.cat === "string" ? req.query.cat : undefined;

  const filter =
    typeof req.query.filter === "string" ? req.query.filter : undefined;

  const data = await getData(
    `https://www.kcs4web.de/kcs4webhcm/Veranstaltungen.aspx?IDC=03371220${
      category ? `&cat=${category}` : ""
    }`
  );

  //  filter items that not exists
  const clean = data.filter((i) => i.bookingStatus);
  const filtered = filter ? filterItems(filter, clean) : clean;

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).json({ data: filtered });
}

const indexToName: { [k: number]: string } = {
  1: "referent",
  3: "ort",
  4: "duration",
  2: "name",
  6: "start",
  7: "end",
};

const getName = (index: number) => {
  return indexToName[index];
};

const getData = async (_url: string) => {
  const page = await fetch(_url);
  const text = await page.text();

  const htmlDocument = new JSDOM(text);

  const content =
    htmlDocument.window.document.querySelector(".GridRowContainer");

  const table = content?.querySelector("table");
  const rows = table?.querySelectorAll("tr:not(.separator)");
  const data: ScrapeEvent[] = [];

  rows?.forEach((row) => {
    const link = url + row?.querySelector("a")?.href;
    const item: { [k: string]: any } = { link };

    const cells = row?.querySelectorAll("td");

    cells.forEach((cell, index) => {
      if (index === 0) {
        const bgImage = cell.style.backgroundImage;

        const status = bgImage.includes("RoundY")
          ? "medium"
          : bgImage.includes("RoundR")
          ? "full"
          : (bgImage.includes("RoundG") && "open") || undefined;

        item.bookingStatus = status;
      }

      if (getName(index)) {
        item[getName(index)] = cell.textContent;
      }
    });
    if (link) data.push(item);
  });

  return data;
};
