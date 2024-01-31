import { baseUrl } from "@lib/Auth/IronSession/IronSession";
import { error } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  throw error("what ever");
  return res.status(200).json({
    baseUrl: baseUrl,
  });
}
