import { SendMailAdapter } from "./adapter";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const NodeMailerAdapter: SendMailAdapter = async ({
  text,
  html,
  to,
  from,
  subject,
}) => {
  try {
    const mail = await transporter.sendMail({
      from: from.email,
      to: Array.isArray(to) ? to.map((i) => i.email) : to.email,
      subject,
      text,
      html,
    });

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return false;
  }
};

// eslint-disable-next-line import/no-unused-modules
export default NodeMailerAdapter;
