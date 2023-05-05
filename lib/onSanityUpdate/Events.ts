/* eslint-disable import/no-unused-modules */

import { evaluation, makeEvent } from "./EventManager";
import { Profile } from "@lib/Profile/validation";

type IProfile = Profile & {
  allowMember?: boolean;
  allowProfile?: boolean;
  approved?: boolean;
  _type?: string;
};

const isMember: evaluation<IProfile> = ({ before }) =>
  before._type === "member";

export const memberUnlocked = makeEvent({
  type: "memberUnlocked",
  evaluate: [
    isMember,
    ({ delta }) => {
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
    return delta.approved?.before === false && delta.approved?.after === true;
  },
});
