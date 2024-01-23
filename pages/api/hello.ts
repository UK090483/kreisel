import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type Data = any;

const msg = {
  from: "web@konradullrich.com", // Change to your recipient
  to: "konradullrich@me.com", // Change to your verified sender
  subject: "bam ",
  text: "bam",
  html: "<strong>bam</strong>",
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const d = await sgMail.send(msg);
    console.log(d);
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({});

  // res.json({
  //   host: process.env.EMAIL_SERVER_HOST,
  //   port: process.env.EMAIL_SERVER_PORT,
  //   auth: {
  //     user: process.env.EMAIL_SERVER_USER,
  //     //pass: process.env.EMAIL_SERVER_PASSWORD,
  //   },
  // });
}
