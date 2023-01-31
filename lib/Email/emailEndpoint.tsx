// email sending endpoint with
import templates from "./template";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { Theme } from "next-auth";

const theme: Theme = {
  brandColor: "#F9DE83",
};

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const template = templates["memberUnlocked"];
  let info = await transporter.sendMail({
    from: `"KREISEL e.V." <${process.env.EMAIL_FROM}>`, // sender address
    to: "konradullrich@me.com", // list of receivers
    subject: template.subject, // Subject line
    text: template.text, // plain text body
    html: template.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).json({ name: "John Doe" });
}

export default handler;
