/* eslint-disable import/no-unused-modules */

import { HeaderSection, ButtonSection, html } from "./templateParts";

const baseUrl = "https://kreisel.vercel.app";
const profileUrl = baseUrl + "/profile";
const memberUrl = baseUrl + "/mitgliederbereich";

export const profileUnlocked = { html: html({}) };
export const profileLocked = { html: html({}) };
export const profileChangesAccepted = { html: html({}) };

const templates = {
  memberUnlocked: {
    html: html({
      content: [
        HeaderSection({ text: "Member Unlocked" }),
        ButtonSection({
          text: "zur Member Page",
          url: memberUrl,
        }),
      ],
    }),
    text: "Member Unlocked",
    subject: "Member Unlocked",
  },
  memberLocked: {
    html: html({ content: [HeaderSection({ text: "Member Locked" })] }),
    text: "Member Locked",
    subject: "Member Locked",
  },
  profileUnlocked: {
    html: html({
      content: [
        HeaderSection({ text: "Profile Unlocked" }),
        ButtonSection({
          text: "zur Profile Page",
          url: profileUrl,
        }),
      ],
    }),
    text: "Profile Unlocked",
    subject: "Profile Unlocked",
  },
  profileLocked: {
    html: html({ content: [HeaderSection({ text: "Profile Locked" })] }),
    text: "Profile Locked",
    subject: "Profile Locked",
  },
  profileChangesAccepted: {
    html: html({
      content: [
        HeaderSection({ text: "Profile Changes Accepted" }),
        ButtonSection({
          text: "zur Profile Page",
          url: profileUrl,
        }),
      ],
    }),
    text: "Profile Changes Accepted",
    subject: "Profile Changes Accepted",
  },
  profileChangesNeedsReview: {
    html: html({
      content: [HeaderSection({ text: "Profile Changes Need Review" })],
    }),
    text: "Profile Changes Accepted",
    subject: "Profile Changes Accepted",
  },
};

export default templates;
