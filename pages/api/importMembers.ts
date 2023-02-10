// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const csv = require("csv-parser");
const fs = require("fs");

type Data = {
  result: any[];
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await getData();

  res.status(200).json({
    result: result.map((item: any) => {
      return item.Vorname;
    }),
  });
}

function getData() {
  const results: any[] = [];
  return new Promise<any>((resolve, reject) => {
    fs.createReadStream("dataImport/kreisel-export-V1.csv")
      .pipe(csv())
      .on("data", (data: any) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err: any) => {
        // console.log(err);
      });
  });
}
