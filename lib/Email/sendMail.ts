import MailerSendAdapter from "./sendAdapter/MailerSend.Adapter";
import templates, { template } from "./template";

const useNodeMailer = false;

export type sendMailProps = {
  to: string | string[];
  template: template;
};

// const from = `"KREISEL e.V." <${process.env.EMAIL_FROM}>`;

const from = { email: `info@kreiselhh.de`, name: "Kreisel e.V." };

const mailSendImplementation = MailerSendAdapter;

export { templates };

const sendMail = async ({ to, template }: sendMailProps) => {
  const isSend = await mailSendImplementation({
    from,
    to: Array.isArray(to) ? to.map((i) => ({ email: i })) : { email: to },
    subject: template.subject,
    text: template.text,
    html: template.html,
  });

  return isSend;
};

export default sendMail;
