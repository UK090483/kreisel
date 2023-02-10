import { sendMailProps } from "@lib/Email/sendMail";
import { isEqual, isObject } from "lodash";

export const handleSanityUpdate = (body: any) => {
  let emails: sendMailProps[] = [];

  const { type, delta, ok, email } = parseBody(body);

  console.log({ delta });

  if (!ok) return { ok };

  if (type === "member") {
    if (delta.allowMember) {
      emails.push({
        template: delta.allowMember.after ? "memberUnlocked" : "memberLocked",
        to: email,
      });
    }
    if (delta.allowProfile) {
      emails.push({
        template: delta.allowProfile.after
          ? "profileUnlocked"
          : "profileLocked",
        to: email,
      });
    }

    if (delta.approved) {
      if (delta.approved.after) {
        emails.push({
          template: delta.allowProfile.after
            ? "profileUnlocked"
            : "profileLocked",
          to: email,
        });
      }
      if (!delta.approved.after) {
        emails.push({
          template: "profileChangesNeedsReview",
          to: "konradullrich@me.com",
        });
      }
    }
  }

  return { ok: true, emails };
};

const parseBody = (body: any) => {
  console.log(body);

  let type: string | null = null;
  let email: string | null = body?.after?.email?.current;
  const delta: { [k: string]: { before: any; after: any } } = {};
  if (!isObject(body?.before) || !isObject(body?.after) || !email)
    return { type, delta, ok: false, email };

  Object.keys(body?.after).forEach((k) => {
    if (!isEqual(body?.after[k], body?.before[k])) {
      delta[k] = { before: body?.before[k], after: body?.after[k] };
    }
  });
  type = body.before._type;
  return { type, delta, ok: true, email };
};
