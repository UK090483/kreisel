// email sending endpoint with

import sendMail from "./sendMail";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const info = await sendMail({
    to: "konradullrich@me.com",
    template: "memberLocked",
  });

  res.status(200).json({ info });
}

export default handler;
