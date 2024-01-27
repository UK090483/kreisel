import { SendMailAdapter } from "./adapter";

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});

const MailerSendAdapter: SendMailAdapter = async ({
  text,
  html,
  to,
  from,
  subject,
}) => {
  const sentFrom = new Sender(from.email, from.name);
  const recipients = Array.isArray(to)
    ? to.map((i) => new Recipient(i.email, i.name))
    : [new Recipient(to.email, to.name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html)
    .setText(text)
    .setSettings({
      //@ts-ignore
      track_clicks: false,
      track_content: false,
      track_opens: false,
    });
  try {
    const d = await mailerSend.email.send(emailParams);
    console.log(d);
    return d.statusCode === 202;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default MailerSendAdapter;
