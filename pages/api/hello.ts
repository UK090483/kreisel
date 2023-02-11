// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import log from "@lib/Log/Log";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await log({ title: "testlog" });
  res.status(200).json({ name: "John Doe" });
}
