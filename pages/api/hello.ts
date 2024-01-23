import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

type Data = any;

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.send) {
    const mail = await transporter.sendMail({
      from: `"KREISEL e.V." <${process.env.EMAIL_FROM}>`, // sender address
      to: "konradullrich@me.com",
      subject: "bli", // Subject line
      text: "bla", // plain text body
      //html: "blub,", // html body
    });
    return res.json({ mail });
  }

  res.json({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      //pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}
