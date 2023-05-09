import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  nau: string;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json({ nau: process.env.NEXTAUTH_URL || "naaaa" });
}
