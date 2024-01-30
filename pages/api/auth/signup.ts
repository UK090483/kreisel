// pages/api/sendEmail.ts
import {
  getUserByEmail,
  sessionOptions,
  baseUrl,
  createNewUser,
  TTL_IN_MINUTES_MAGIC_LINK,
} from "@lib/Auth/IronSession/IronSession";
import sendMail, { templates } from "@lib/Email/sendMail";
import { validation } from "pages/auth/signup";
import authRoutes from "@lib/Auth/authRoutes";
import { NextApiRequest, NextApiResponse } from "next";
import { sealData, unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { InferType } from "yup";

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(async function singUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const validated = await validation.validate(data, {
      strict: true,
      stripUnknown: true,
    });
    const { email, firstName, name } = validated;
    const user = await getUserByEmail({ email });

    if (user) {
      return res.send({
        error:
          "diese email kann nicht genutzt werden. Eventuell gibt es den User schon",
      });
    }

    const seal = await sealData(
      { user: { email, firstName, name }, created_at: Date.now() },
      {
        password: sessionOptions.password,
      }
    );

    await sendMail({
      to: email,
      template: templates["verifyMail"](
        `${baseUrl}/${authRoutes.api.signup}?seal=${seal}`
      ),
    });

    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    const seal = typeof req.query.seal === "string" && req.query.seal;
    if (!seal) {
      res.redirect(`/${authRoutes.errors.linkExpired}`);
      return;
    }
    const unsealed = await unsealData<{
      user: InferType<typeof validation>;
      created_at: number;
    }>(seal, {
      password: sessionOptions.password,
    });
    const { user: _user, created_at } = unsealed;

    const now = new Date().getTime();
    const diff = (now - created_at) / 60000;
    if (!created_at || diff > TTL_IN_MINUTES_MAGIC_LINK) {
      res.redirect(`/auth/error?error=verification`);
      return;
    }

    if (!_user) {
      res.redirect(`/${authRoutes.errors.linkExpired}`);
      return;
    }

    const exists = await getUserByEmail({ email: _user.email });

    if (exists) {
      req.session.user = exists;
      await req.session.save();
      res.redirect(`/`).end();
      return;
    }

    const newUser = await createNewUser(_user);

    if (newUser) {
      const user = await getUserByEmail({ email: _user.email });
      req.session.user = user;
      await req.session.save();
      res.redirect(`/`).end();
    }
  }
},
sessionOptions);
