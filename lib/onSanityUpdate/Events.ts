/* eslint-disable import/no-unused-modules */

import { evaluation, makeEvent } from "./EventManager";
import { Profile } from "@lib/Profile/validation";

type IProfile = Profile & {
  allowMember?: boolean;
  allowProfile?: boolean;
  approved?: boolean;
  _type?: string;
};

const isMember: evaluation<IProfile> = ({ before, after }) =>
  before?._type === "member" || after?._type === "member";

export const memberUnlocked = makeEvent({
  type: "memberUnlocked",
  evaluate: [
    isMember,
    ({ delta }) => {
      if (delta === null) return false;
      return !!(
        delta.allowMember &&
        (delta.allowMember.before === false ||
          delta.allowMember.before === undefined) &&
        delta.allowMember.after === true
      );
    },
  ],
});

export const memberLocked = makeEvent({
  type: "memberLocked",
  evaluate: [
    isMember,
    ({ delta }) => {
      if (delta === null) return false;
      return !!(
        delta.allowMember &&
        delta.allowMember.before === true &&
        delta.allowMember.after === false
      );
    },
  ],
});

export const profileUnlocked = makeEvent({
  type: "profileUnlocked",
  evaluate: ({ delta }) => {
    if (delta === null) return false;
    return !!(
      delta.allowProfile &&
      (delta.allowProfile.before === false ||
        delta.allowProfile.before === undefined) &&
      delta.allowProfile.after === true
    );
  },
});

export const profileLocked = makeEvent({
  type: "profileLocked",
  evaluate: ({ delta }) => {
    if (delta === null) return false;
    return !!(
      delta.allowProfile &&
      delta.allowProfile.before === true &&
      delta.allowProfile.after === false
    );
  },
});

export const profileChanged = makeEvent({
  type: "profileChanged",
  evaluate: ({ delta }) => {
    if (delta === null) return false;
    return (
      (delta.approved?.before === true ||
        delta.approved?.before === undefined) &&
      delta.approved?.after === false
    );
  },
});

export const profileApproved = makeEvent({
  type: "profileApproved",
  evaluate: ({ delta }) => {
    if (delta === null) return false;
    return delta.approved?.before === false && delta.approved?.after === true;
  },
});

export const memberCreated = makeEvent({
  type: "memberCreated",
  evaluate: ({ delta, before }) => {
    return delta === null && before === null;
  },
});

export const memberErased = makeEvent({
  type: "memberErased",
  evaluate: ({ delta, after }) => {
    return delta === null && after === null;
  },
});
