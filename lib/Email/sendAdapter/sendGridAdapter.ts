import { SendMailAdapter } from "./adapter";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const SendgridAdapter: SendMailAdapter = async ({
  text,
  html,
  to,
  from,
  subject,
}) => {
  try {
    await sgMail.send({
      from,
      to,
      subject,
      text, // plain text body
      html, // html body
      trackingSettings: {
        clickTracking: { enable: false, enableText: false },
      },
    });

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return false;
  }
};

export default SendgridAdapter;
