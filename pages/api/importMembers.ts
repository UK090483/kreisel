// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fields, { membershipOptions } from "@lib/Profile/Fields";
import { schema } from "@lib/Profile/validation";
import { string } from "yup";
import type { NextApiRequest, NextApiResponse } from "next";

const csv = require("csv-parser");
const fs = require("fs");

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

      // return { old, mobile: mobile && mobile[0] };

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
  image: {
    key: "Bild",
    validate: async (val) => {
      if (val) {
        return { url: val };
      }
      return undefined;
    },
  },
  offersInternship: {
    key: "Hospitationsplatz",
    validate: async (val) => {
      return val === "Ja" ? true : undefined;
    },
  },
  focus: { key: "---" },
  focusOther: { key: "---" },
  degree: {
    key: "Abschlüsse",
    validate: async (val) => {
      if (!val) return;
      const degreeMap: { [K: string]: any } = {
        "KREISELzertifikat (dreijährige Ausbildung)": "__",
        "Integrative Lerntherapeutin / Integrativer Lerntherapeut FiL": "__",
        "Dyslexietherapeut® nach BVL": "___",
        "Dyskalkulietherapeut nach BVL": "___",
        "KREISELgrundlagen (einjährige Ausbildung)": "___",
        "Dreijährige Ausbildung": "___",
        "KREISELurkunde (zweijährige Ausbildung)": "___",
        "Zweijährige Ausbildung": "___",
      };

      return;
      return val
        .split(",")
        .filter((i) => !!i.trim())
        .map((i) => {
          const deg = degreeMap[i.trim()];
          if (!deg) {
            throw new Error(`degree __${i}__ not found `);
          }

          return deg;
        });
    },
  },
  membership: {
    key: "Mitgliedschaften",
    validate: async (val) => {
      if (!val) return;
      return val
        .split(",")
        .filter((i) => !!i.trim())
        .map((i) => {
          const found = membershipOptions.find(
            (option) =>
              option.title.toLowerCase() === i.trim().toLocaleLowerCase()
          );
          if (!found) {
            throw new Error(`membershipOption __${i.trim()}__ not found `);
          }

          return found.value;
        });
    },
  },
  qualification: { key: "Beruf" },
  allowMember: {
    key: "Rollen",
    validate: async (val) => {
      return ["Lerntherapeut", "Mitglied"].includes(val);
    },
  },
  allowProfile: {
    key: "Rollen",
    // validate: async (val) => {
    //   return val === "Lerntherapeut";
    // },
  },
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await getData();
  const fields = await showFields(result);

  const testItem = result[0];

  const cleanTestItem = await cleanItem(testItem);

  res.status(200).json({
    // fields: fields["allowMember"],
    // testItem,
    // cleanTestItem,
    // item: result[0],
    // fields,

    resulte: result.filter((item: any) => {
      return item["Rollen"]
        ? (item["Rollen"] as string).match(
            /admin-kreisel | Redaktion | Administrator/gi
          )
        : false;
    }),
    result: result.map((item: any) => {
      return item["Rollen"];
    }),
  });
}

async function cleanItem(item: { [k: string]: any }) {
  const _result: { [k: string]: any } = {};

  for (const field of fields) {
    const handler = lookup[field.name];
    if (!handler) {
      // eslint-disable-next-line no-console
      console.log(`handler for:${field.name} missing`);
      continue;
    }

    const key = handler.key;
    const value = item[key];

    if (handler?.validate) {
      _result[field.name] = await handler.validate(value, item);
    }
    if (!handler?.validate) {
      _result[field.name] = value;
    }
  }

  schema.validate(_result);
  return _result;
}

async function cleanData(result: any[]) {
  const _result = [];

  for (const item of result) {
  }
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

async function showFields(result: any[]) {
  return await fields.reduce(async (acc, field) => {
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
}
