import MailerSendAdapter from "./sendAdapter/MailerSend.Adapter";
import templates, { template } from "./template";

const useNodeMailer = false;

export type sendMailProps = {
  to: string | string[];
  template: template;
};

// const from = `"KREISEL e.V." <${process.env.EMAIL_FROM}>`;

const from = `info@kreiselhh.de`;

const mailSendImplementation = MailerSendAdapter;

export { templates };

const sendMail = async ({ to, template }: sendMailProps) => {
  const isSend = await mailSendImplementation({
    from,
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });

  return;
};

export default sendMail;
