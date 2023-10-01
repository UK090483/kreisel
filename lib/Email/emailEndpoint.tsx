// email sending endpoint with

import sendMail, { templates } from "./sendMail";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const info = await sendMail({
    to: "konradullrich@me.com",
    template: templates["memberUnlocked"],
  });

  res.status(200).json({ info });
}

export default handler;
