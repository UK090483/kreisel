// pages/api/sendEmail.ts
import {
  getUserByEmail,
  sessionOptions,
  baseUrl,
  createNewUser,
  authErrors,
} from "@lib/Auth/IronSession/IronSession";
import sendMail, { templates } from "@lib/Email/sendMail";
import { validation } from "pages/auth/signup";
import authRoutes from "@lib/Auth/authRoutes";
import { NextApiRequest, NextApiResponse } from "next";
import { sealData, unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { InferType } from "yup";
import { v4 as uuid } from "uuid";

const signupData: { [key: string]: InferType<typeof validation> } = {};

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
    const { email, name, firstName } = validated;
    const user = await getUserByEmail({ email });

    if (user) {
      return res.send({
        error:
          "diese email kann nicht genutzt werden. Eventuell gibt es den User schon",
      });
    }

    const id = uuid();
    signupData[id] = validated;

    const seal = await sealData(
      { id },
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
        `/${authRoutes.pages.error}&error=${authErrors.linkExpired}`
      );
      return;
    }
    const { id } = await unsealData<{ id: string }>(seal, {
      password: sessionOptions.password,
    });

    if (!signupData[id]) {
      res.redirect(
        `/${authRoutes.pages.error}?error=${authErrors.linkExpired}`
      );
      return;
    }

    const newUser = await createNewUser(signupData[id]);

    if (newUser) {
      const user = await getUserByEmail({ email: signupData[id].email });
      req.session.user = user;

      await req.session.save();

      res.redirect(`/`).end();
    }
  }
},
sessionOptions);
