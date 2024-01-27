type unit = { email: string; name?: string };

type sendMailProps = {
  to: unit | unit[];
  text: string;
  html: string;
  from: unit;
  subject: string;
};

export type SendMailAdapter = (props: sendMailProps) => Promise<boolean>;
