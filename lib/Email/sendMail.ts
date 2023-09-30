import templates from "./template";
import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export type sendMailProps = {
  to: string | string[];
  template: keyof typeof templates;
  content?: { subject?: string; text?: string; html?: string };
};

const sendMail = async ({ to, template, content }: sendMailProps) => {
  const temp = templates[template];
  return await transporter.sendMail({
    from: `"KREISEL e.V." <${process.env.EMAIL_FROM}>`, // sender address
    to,
    subject: content?.subject || temp.subject, // Subject line
    text: content?.text || temp.text, // plain text body
    html: content?.html || temp.html, // html body
  });
};

export default sendMail;
