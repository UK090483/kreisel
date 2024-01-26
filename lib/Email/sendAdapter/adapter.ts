type sendMailProps = {
  to: string | string[];
  text: string;
  html: string;
  from: string;
  subject: string;
};

export type SendMailAdapter = (props: sendMailProps) => Promise<boolean>;
