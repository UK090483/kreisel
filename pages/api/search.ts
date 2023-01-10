import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({});
}
