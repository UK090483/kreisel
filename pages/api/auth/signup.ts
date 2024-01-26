// pages/api/sendEmail.ts
import {
  getUserByEmail,
  sessionOptions,
  baseUrl,
  createNewUser,
} from "@lib/Auth/IronSession/IronSession";
import sendMail, { templates } from "@lib/Email/sendMail";
import { validation } from "pages/auth/signup";
import authRoutes from "@lib/Auth/authRoutes";
import { authErrorCodes } from "pages/auth/error";
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
      { user: { email, firstName, name } },
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
      res.redirect(
        `/${authRoutes.pages.error}&error=${authErrorCodes.linkExpired}`
      );
      return;
    }
    const unsealed = await unsealData<{
      user: InferType<typeof validation>;
    }>(seal, {
      password: sessionOptions.password,
    });
    const { user: _user } = unsealed;

    if (!_user) {
      res.redirect(
        `/${authRoutes.pages.error}?error=${authErrorCodes.linkExpired}`
      );
      return;
    }

    const newUser = await createNewUser(_user);

    console.log({ newUser });

    if (newUser) {
      const user = await getUserByEmail({ email: _user.email });

      console.log({ user });
      req.session.user = user;

      await req.session.save();

      res.redirect(`/`).end();
    }
  }
},
sessionOptions);
