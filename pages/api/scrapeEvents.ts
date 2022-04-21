import { JSDOM } from "jsdom";
import type { NextApiRequest, NextApiResponse } from "next";
import blockTools from "@sanity/block-tools";
import Schema from "@sanity/schema";

import { previewClient } from "@services/SanityService/sanity.server";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getData(
    "https://www.kcs4web.de/kcs4webhcm/Veranstaltungen.aspx?IDC=03371220&hsstartdate=1&hsenddate=1&reset=1"
  );

  // const docs = await Promise.all(data.map((i) => createDoc(i)));

  //   const blo = getImageBlob(
  //     "https://www.kreiselhh.de/sites/default/files/kreiselbilder/lerntherapeuten/presber_eva_maria.jpg"
  //   );

  //   const data = await getData(
  //     "https://www.kreiselhh.de/lerntherapeuten/eva-maria-presber"
  //   );

  //@ts-ignore
  res.status(200).json({ data });
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

const getData = async (url: string) => {
  const page = await fetch(url);
  const text = await page.text();
  const htmlDocument = new JSDOM(text);

  const content =
    htmlDocument.window.document.querySelector(".GridRowContainer");

  const table = content?.querySelector("table");
  const rows = table?.querySelectorAll("tr:not(.separator)");
  const data: any[] = [];

  rows?.forEach((row) => {
    const link = row?.querySelector("a")?.href;
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
