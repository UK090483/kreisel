import testUser from "../../../testUser";
import { previewClient } from "@services/SanityService/sanity.server";
import { v4 as uuid } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: any;
};

const userQuery = `*[_type == "member" && _id in path("member.fake.*")]`;

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let user: any | null = null;

  if (req.method === "DELETE") {
    user = await previewClient.delete({
      query: userQuery,
    });
  }

  if (req.method === "POST") {
    const { allowMember, allowProfile, mailName } = req.query;

    const next = {
      ...(allowMember ? { allowMember: allowMember === "true" } : {}),
      ...(allowProfile ? { allowProfile: allowProfile === "true" } : {}),
    };

    user = await previewClient.create({
      _type: "member",
      _id: `member.fake.${uuid()}`,
      email: { current: `${mailName}@developermail.com`, _type: "slug" },
      name: testUser.name,
      firstName: testUser.firstName,
      oneTimePassword: { current: testUser.oneTimePassword, _type: "slug" },
      ...next,
    });
  }

  res.status(200).json({ user });
}
