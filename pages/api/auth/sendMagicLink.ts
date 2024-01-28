// pages/api/sendEmail.ts
import {
  getUserByEmail,
  sessionOptions,
  baseUrl,
} from "@lib/Auth/IronSession/IronSession";
import sendMail, { templates } from "@lib/Email/sendMail";
import { NextApiRequest, NextApiResponse } from "next";
import { sealData } from "iron-session";

// eslint-disable-next-line import/no-unused-modules
export default async function sendMagicLinkRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = typeof req.query.email === "string" && req.query.email;

  if (!email) {
    throw new Error("Email ist not defined");
  }

  const user = await getUserByEmail({ email });
  const seal = await sealData(
    {
      email,
      created_at: Date.now(),
    },
    {
      password: sessionOptions.password,
    }
  );

  if (user) {
    await sendMail({
      to: email,
      template: templates["magicLink"](
        `${baseUrl}/api/auth/magicLogin?seal=${seal}`
      ),
    });
    return res.status(200).send({ ok: true });
  }

  if (!user) {
    res.status(404).send({});
  }
}
