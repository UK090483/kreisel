import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHXr6t2siosMF236u4fnMZ9UsI7jzx4-EEWHGdZ9WmfAa-M2-YvqtTETF2pKYsY6i2D6pzRt0GEEfe/pub?gid=0&single=true&output=pdf";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(url); // replace this with your API call & options
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=dummy.pdf");
  //@ts-ignore
  await pipeline(response.body, res);
}
// eslint-disable-next-line import/no-unused-modules
export default handler;
