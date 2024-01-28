/* eslint-disable import/no-unused-modules */

import { HeaderSection, ButtonSection, html } from "./templateParts";

const baseUrl = "https://kreisel.vercel.app";
const profileUrl = baseUrl + "/profile";
const memberUrl = baseUrl + "/mitgliederbereich";

export const profileUnlocked = { html: html({}) };
export const profileLocked = { html: html({}) };
export const profileChangesAccepted = { html: html({}) };

export type template = { html: string; text: string; subject: string };
const templates = {
  magicLink: (link: string) => ({
    html: html({
      content: [
        HeaderSection({ text: "Magic Link" }),
        ButtonSection({
          text: "Click to Login",
          url: link,
        }),
      ],
    }),
    text: `Magic Link : <a href="${link}/">click here to login</a>.`,
    subject: "Magic Link",
  }),
  verifyMail: (link: string) => ({
    html: html({
      content: [
        HeaderSection({ text: "Email Bestätigung" }),
        ButtonSection({
          text: "Email Bestätigen",
          url: link,
        }),
      ],
    }),
    text: `Email Bestätigen : <a href="${link}/">Email Bestätigen</a>.`,
    subject: "Email Bestätigen",
  }),

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
  profileChangesNeedsReview: ({ name }: { name: string }) => ({
    html: html({
      content: [HeaderSection({ text: `${name} hat sein Profil bearbeitet` })],
    }),
    text: `${name} hat sein Profil bearbeitet`,
    subject: `${name} hat sein Profil bearbeitet`,
  }),
  memberCreated: ({ name }: { name: string }) => {
    return {
      html: html({
        content: [HeaderSection({ text: `${name} ist neues Member` })],
      }),
      text: `${name} ist neues Member`,
      subject: `${name} ist neues Member`,
    };
  },
};

export default templates;
