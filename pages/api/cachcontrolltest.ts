// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
let count = 0;
// eslint-disable-next-line import/no-unused-modules
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  count++;
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).json({ time: Date.now(), count });
}
