import { therapistQuery } from "./therapist.query";

import { previewClient } from "@services/SanityService/sanity.server";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-unused-modules
export const getHandler = () => {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const member = await previewClient.fetch<{ _id: string }[]>(
      `*[_type == "member" && show == true && !(_id in path("drafts.**")) ]{${therapistQuery}}`
    );

    res.status(200).json({
      member: member.map((i) => ({
        ...i,
        _id: crypto.createHash("sha1").update(i._id).digest("hex"),
      })),
    });
  };
};
