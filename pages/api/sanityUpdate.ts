// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UpdateEventManager from "@lib/onSanityUpdate/EventManager";
import parser from "@lib/onSanityUpdate/DataParser";
import {
  memberLocked,
  memberUnlocked,
  profileLocked,
  profileUnlocked,
  profileChanged,
  profileApproved,
} from "@lib/onSanityUpdate/Events";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const manager = new UpdateEventManager(
    [
      memberLocked,
      memberUnlocked,
      profileLocked,
      profileUnlocked,
      profileChanged,
      profileApproved,
    ],
    (e, data) => {
      console.log(e);
    },
    () => {
      console.log("error");
    }
  );

  manager.run(parser(req.body));
  res.status(200).json({ name: "John Doe" });
}
