import { baseUrl } from "@lib/Auth/IronSession/IronSession";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(200).json({
    v: process.env.NEXTAUTH_URL,
    bas: baseUrl,
    c: process.env.VERCEL_ENV,
  });

  // res.json({
  //   host: process.env.EMAIL_SERVER_HOST,
  //   port: process.env.EMAIL_SERVER_PORT,
  //   auth: {
  //     user: process.env.EMAIL_SERVER_USER,
  //     //pass: process.env.EMAIL_SERVER_PASSWORD,
  //   },
  // });
}
