// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
let count = 0;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  count++;
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  res.status(200).json({ time: Date.now(), count });
}
