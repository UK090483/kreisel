import testUser from "../../../testUser";
import { previewClient } from "@services/SanityService/sanity.server";
import { v4 as uuid } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: any;
};

const userQuery = `*[_type == "member" && email.current == "${testUser.mail}" ]`;

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let user: any | null = null;

  if (req.method === "GET") {
    user = await previewClient.fetch(userQuery);
  }

  if (req.method === "DELETE") {
    user = await previewClient.delete({
      query: userQuery,
    });
  }

  if (req.method === "POST") {
    const { allowMember, allowProfile } = req.query;

    const next = {
      ...(allowMember ? { allowMember: allowMember === "true" } : {}),
      ...(allowProfile ? { allowProfile: allowProfile === "true" } : {}),
    };

    let user = await previewClient.fetch(`${userQuery}[0]{_id}`);

    if (!user) {
      user = await previewClient.create({
        _type: "member",
        _id: `member.${uuid()}`,
        email: { current: testUser.mail, _type: "slug" },
        name: testUser.name,
        firstName: testUser.firstName,
        oneTimePassword: { current: testUser.oneTimePassword, _type: "slug" },
        ...next,
      });
    }

    if (user && Object.keys(next).length > 0) {
      user = await previewClient
        .patch({
          query: userQuery,
        })
        .set(next)
        .commit();
    }
  }

  res.status(200).json({ user });
}
