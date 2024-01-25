import templates, { template } from "./template";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

const useNodeMailer = false;
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

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
  template: template;
};

export { templates };

const sendMail = async ({ to, template }: sendMailProps) => {
  const d = { action: "send mail", subject: template.subject };

  if (useNodeMailer) {
    const mail = await transporter.sendMail({
      from: `"KREISEL e.V." <${process.env.EMAIL_FROM}>`, // sender address
      to,
      subject: template.subject, // Subject line
      text: template.text, // plain text body
      html: template.html, // html body
    });
  } else {
    try {
      await sgMail.send({
        from: "web@konradullrich.com", // Change to your recipient
        to, // Change to your verified sender
        subject: template.subject, // Subject line
        text: template.text, // plain text body
        html: template.html, // html body
        trackingSettings: {
          clickTracking: { enable: false, enableText: false },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return;
};

export default sendMail;
