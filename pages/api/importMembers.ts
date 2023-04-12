// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fields from "@lib/Profile/Fields";
import { string } from "yup";
import type { NextApiRequest, NextApiResponse } from "next";
const csv = require("csv-parser");
const fs = require("fs");
// [\d ]{6,13}
type Data = any;

const mobileMatcher =
  /(\+\s*..\s?(\(0\))?|0){1}1\d{2,3}[\s,\/,-]{0,3}((\d{7,8})|(\d{1}\s\d{2}\s\d{2}\s\d{2})|(\d{2}\s\d{2}\s\d{2,3})|(\d{3}\s\d{2}\s?\d{0,3}))\s{1}/g;
const mobileM2 = /(01\d\d ?[-/]?|\+ ?49 ?(\(0\))?\d{3}) ?[\d ]{6,11} /g;
const dev = true;

const lookup: {
  [K: string]: {
    key: string;
    validate?: (
      val: string,
      all: Record<string, string | undefined>
    ) => Promise<any>;
  };
} = {
  title: { key: "Titel" },
  firstName: { key: "Vorname" },
  name: { key: "Name" },
  email: {
    key: "E-Mail",
    validate: async (val) => {
      const email = string().email();
      await email.validate(val);
      return val;
    },
  },
  practice: { key: "---" },
  street: { key: "Straße" },
  zipCode: { key: "PLZ" },
  city: { key: "Ort" },
  phone: {
    key: "---",
    validate: async (val, all) => {
      const old = all?.Telefon;
      if (!old) return "";

      const mobile = (old + " ")
        .match(mobileM2)
        ?.map((i) => i.replaceAll(/[-/: ]/g, ""));

      return { old, mobile: mobile && mobile[0] };

      return val;
    },
  },
  mobile: { key: "---" },
  website: {
    key: "Webseite",
    validate: async (val) => {
      if (dev) return val;

      const url = string().url();
      await url.validate(val);
      if (val) {
        try {
          const res = await fetch(val);
          if (res.status === 200) {
            return val;
          }
          console.log(res.status);
          console.log(val);
          return "";
        } catch (error) {
          return "";
        }
      }
      return "";
    },
  },
  description: { key: "Beschreibung" },
  image: { key: "Bild" },
  offersInternship: { key: "Hospitationsplatz" },
  focus: { key: "---" },
  focusOther: { key: "---" },
  degree: { key: "Abschlüsse" },
  membership: { key: "Mitgliedschaften" },
  qualification: { key: "Beruf" },
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await getData();

  const phones = result.reduce((acc, item) => {
    if (!item?.Telefon) return acc;

    return `${acc} ${item?.Telefon}`;
  }, "");

  const f = await fields.reduce(async (acc, field) => {
    const awaited = await acc;
    const items = await Promise.all(
      result.map(async (item: any) => {
        const handler = lookup[field.name];
        if (!handler) return `handler missing`;
        const key = handler.key;

        if (handler?.validate) {
          return await handler.validate(item[key], item);
        }
        if (key === "---") return `needs review`;
        return item[key];
      })
    );

    return {
      ...awaited,
      [field.name]: {
        name: field.name,
        //@ts-ignore
        items: [...new Set(items)],
      },
    };
  }, Promise.resolve<Record<string, { items: any[] }>>({}));

  res.status(200).json({
    // phones: phones.match(mobileM2),

    item: result[0],
    fields: f,

    // result: result.map((item: any) => {
    //   return item;
    // }),
  });
}

function getData() {
  const results: any[] = [];
  return new Promise<Record<string, string | undefined>[]>(
    (resolve, reject) => {
      fs.createReadStream("dataImport/kreisel-export-V1.csv")
        .pipe(csv())
        .on("data", (data: any) => results.push(data))
        .on("end", () => {
          resolve(results);
        })
        .on("error", (err: any) => {
          // console.log(err);
        });
    }
  );
}
