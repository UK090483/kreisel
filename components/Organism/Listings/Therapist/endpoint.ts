import { therapistQuery } from "./therapist.query";
import { previewClient } from "@services/SanityService/sanity.server";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-unused-modules

export const getHandler = () => {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const member = await previewClient.fetch(
      `*[_type == "member" ]{${therapistQuery}}`
    );
    res.status(200).json({ member });
  };
};
