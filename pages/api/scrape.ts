import { previewClient } from "@services/SanityService/sanity.server";
import { JSDOM } from "jsdom";
// import blockTools from "@sanity/block-tools";
import Schema from "@sanity/schema";
import type { NextApiRequest, NextApiResponse } from "next";

const defaultSchema = Schema.compile({
  name: "myBlog",
  types: [
    {
      type: "object",
      name: "blogPost",
      fields: [
        {
          title: "Title",
          type: "string",
          name: "title",
        },
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("blogPost")
  //@ts-ignore
  .fields.find((field) => field.name === "body").type;

type Data = {
  name: string;
};

const keyMap = {
  "Vorname:&nbsp;": "firstName",
  "Name:&nbsp;": "name",
  "Beruf:&nbsp;": "jobDescription",
  "Straße:&nbsp;": "street",
  "PLZ:&nbsp;": "zipCode",
  "Ort:&nbsp;": "city",
  "Telefon:&nbsp;": "phone",
  "E-Mail:&nbsp;": "email",
  "Website:&nbsp;": "website",
  "Beschreibung:&nbsp;": "description",
  "Ausbildung:&nbsp;": "education",
  "Mitgliedschaften:&nbsp;": "KREISELnetzwerk",
  "Abschlüsse:&nbsp;": "degrees",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const linksList = await Promise.all(
    new Array(2)
      .fill("bla")
      .map((_i, index) =>
        getLinks(
          `https://www.kreiselhh.de/lerntherapeutenliste?field_plz_value=All&page=${index}`
        )
      )
  );

  const links = linksList.flat();

  const data = await Promise.all(links.map((i) => getData(i)));

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

const getData = async (url: string) => {
  const page = await fetch(url);
  const text = await page.text();
  const htmlDocument = new JSDOM(text);
  const content = htmlDocument.window.document.querySelector("#content");
  const sections = content?.querySelectorAll("section");
  const image = content?.querySelector("img");
  const data = {};
  //@ts-ignore
  data.image = image && image.src;
  //@ts-ignore
  data.slug = url.substr(url.lastIndexOf("/") + 1);

  // sections &&
  //   sections.forEach((i) => {
  //     const key = i.querySelector(".field-label")?.innerHTML;
  //     //@ts-ignore
  //     const _key = keyMap[key] || key;

  //     let val = i.querySelector(".field-item")?.innerHTML;

  //     if (["email", "website"].includes(_key)) {
  //       val = i.querySelector("a")?.innerHTML;
  //     }

  //     if (["description"].includes(_key)) {
  //       val = blockTools.htmlToBlocks(val, blockContentType, {
  //         //@ts-ignore
  //         parseHtml: (html) => new JSDOM(html).window.document,
  //       });
  //     }
  //     //@ts-ignore
  //     data[_key] = val;
  //   });
  // return data;
};

const getLinks = async (url: string) => {
  const page = await fetch(url);
  const text = await page.text();
  const htmlDocument = new JSDOM(text);
  const content = htmlDocument.window.document.querySelector(".view-content");

  const links: string[] = [];

  // const linkComponents = content?.querySelectorAll("a");

  // linkComponents &&
  //   linkComponents?.forEach((a) => {
  //     console.log(a.href);

  //     links.push(`https://www.kreiselhh.de${a.href}`);
  //   });

  return links;
};

const createDoc = async (data: { [k: string]: any }) => {
  const omit = ["image", "KREISELnetzwerk", "slug"];
  const omitData = Object.entries(data).reduce((acc, [key, val]) => {
    if (omit.includes(key)) {
      return acc;
    }
    return { ...acc, [key]: val };
  }, {} as { [k: string]: any });

  if (data.image) {
    const i = await getImageBlob(
      data.image,
      `${data.firstName || ""}-${data.name || ""}`
    );
    omitData.image = {
      _type: "defaultImage",
      alt: `${data.firstName || ""} ${data.name || ""}`,
      asset: {
        _ref: i._id,
        _type: "reference",
      },
    };
  }

  const res = await previewClient.create({ _type: "therapist", ...omitData });
  console.log(res);
};

const getImageBlob = async (url: string, name: string) => {
  const response = await fetch(url);
  const reader = response.body as ReadableStream<any>;
  const uploadResponse = await previewClient.assets.upload("image", reader, {
    filename: `${name}.jpg`,
  });
  return uploadResponse;
};

export {};
