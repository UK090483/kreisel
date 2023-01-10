// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type DataResultItem = { row: { [k: string]: string }; values: string[] };
type DataResult = DataResultItem[];

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query?.url;
  const isString = typeof url === "string";
  if (!url || !isString) return res.status(200).json({ error: "no url" });
  let text = "";
  try {
    const res = await fetch(url);
    text = await res.text();
  } catch (error) {
    res.status(200).json({ error });
  }
  return res.status(200).json({ data: csvJSON(text) });
}

const csvJSON = (csvText: string): DataResult => {
  const linesArray = csvText.split("\r\n");
  const header = linesArray[0].split(",");
  linesArray.shift();
  const obj: DataResultItem[] = [];

  linesArray.forEach((line) => {
    const lineArray = CSVtoArray(line);

    const res: DataResultItem = { row: {}, values: [] };

    if (!lineArray) {
      obj.push(res);
      return;
    }
    header.forEach((head, index) => {
      res.row[head] = lineArray[index];
      res.values.push(lineArray[index]);
    });
    obj.push(res);
  });
  return obj;
};

// stolen from :https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

function CSVtoArray(text: string) {
  var re_valid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  var a = []; // Initialize array to receive values.
  text.replace(
    re_value, // "Walk" the string using replace with callback.
    function (m0, m1, m2, m3) {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ""; // Return empty string.
    }
  );
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push("");
  return a;
}
