import { AuthData } from "@lib/ApiMiddleWare/AuthMiddleware";
import { schema } from "lib/Profile/validation";
import { previewClient } from "@services/SanityService/sanity.server";
import { sessionOptions } from "@lib/Auth/IronSession/IronSession";
import { SanityClient } from "@sanity/client";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest & AuthData,
  res: NextApiResponse<any>
) {
  const email = req.session.user?.email;
  const data = await schema.validate(req.body);

  if (!email) {
    return res.status(500).json({ message: "email missing" });
  }

  updateUser(previewClient, email, data);

  res.status(200).json({ data });
}

const updateUser = async (client: SanityClient, email: string, data: any) => {
  const items = await client.fetch<{ _id: string; approved?: boolean }[]>(
    `*[_type == 'member' && email.current == '${email}' ][]`
  );
  if (items.length < 1) {
    return null;
  }
  const original = items.find((i) => !i._id.startsWith("drafts"));
  const draft = items.find((i) => i._id.startsWith("drafts"));

  const nextData = draft ? draft : original;

  if (original) {
    await client
      .transaction()
      .createOrReplace({ ...nextData, ...data, _id: "drafts." + original._id })
      .patch(client.patch(original._id).set({ approved: false }))
      .commit();
  }
};

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(handler, sessionOptions);
