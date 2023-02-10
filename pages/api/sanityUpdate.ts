// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sendMail from "@lib/Email/sendMail";
import { handleSanityUpdate } from "@lib/onSanityUpdate/handleSanityUpdate";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { emails } = handleSanityUpdate(req.body);

  if (emails) {
    const emailResult = await Promise.all(emails?.map((m) => sendMail(m)));
    // console.log(emailResult);
  }

  res.status(200).json({ name: "John Doe" });
}
