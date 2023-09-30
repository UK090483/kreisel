// pages/api/sendEmail.ts
import {
  getUserByEmail,
  sessionOptions,
  baseUrl,
} from "@lib/Auth/IronSession/IronSession";
import sendMail from "@lib/Email/sendMail";
import { NextApiRequest, NextApiResponse } from "next";
import { sealData } from "iron-session";

// eslint-disable-next-line import/no-unused-modules
export default async function sendEmailRoute(
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
    },
    {
      password: sessionOptions.password,
    }
  );

  if (user) {
    console.log("start sending email");

    await sendMail({
      to: email,
      template: "memberLocked",
      content: {
        text: `Hey there ${email}, <a href="${baseUrl}/api/auth/magicLogin?seal=${seal}">click here to login</a>.`,
        subject: "Magic link",
        html: `Hey there ${email}, <a href="${baseUrl}/api/auth/magicLogin?seal=${seal}">click here to login</a>.`,
      },
    });

    console.log("done sending email");
    res.send({ ok: true });
  }

  if (!user) {
    res.status(404).send({});
  }
}
