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
  memberCreated,
  memberErased,
} from "@lib/onSanityUpdate/Events";
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail, { templates } from "@lib/Email/sendMail";
import testUser from "testUser";

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
      memberCreated,
      memberErased,
    ],
    async (e, data) => {
      //console.log({ e, data });
      if (e.includes("memberCreated")) {
        const name = data?.after?.name || "";
        const firstName = data?.after?.firstName;

        if (firstName === testUser.firstName) {
          await sendMail({
            to: "konradullrich@me.com",
            template: templates.memberCreated({
              name: `${firstName} ${name}`,
            }),
          });
          return;
        }
        await sendMail({
          to: "web@konradullrich.com",
          template: templates.memberCreated({ name: `${firstName} ${name}` }),
        });
      }
      if (e.includes("profileChanged")) {
        const name = data?.after?.name || "";
        const firstName = data?.after?.firstName;
        if (firstName === testUser.firstName) {
          await sendMail({
            to: "konradullrich@me.com",
            template: templates.profileChangesNeedsReview({
              name: `${firstName} ${name}`,
            }),
          });
          return;
        }
        await sendMail({
          to: "web@konradullrich.com",
          template: templates.profileChangesNeedsReview({
            name: `${firstName} ${name}`,
          }),
        });
      }
    },
    () => {
      console.error("error");
    }
  );
  await manager.run(parser(req.body));
  res.status(200).json({});
}
