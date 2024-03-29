import { memberSchema, schema } from "./validation";
import { SanityClient } from "@sanity/client";

const profileQuery = `
title,
firstName,
name,
practice,
street,
zipCode,
city,
phone,
mobile,
website,
description,
focus,
focusOther,
degree,
membership,
qualification,
offersInternship,
wantsPublicProfile,
`;

export type profileQueryResult = {
  title: string | null;
  firstName: string | null;
  name: string | null;
  jobDescription: string | null;
  surgery: string;
  addressSupplement: string;
  street: string;
  city: string;
  phone: string;
  mobile: string;
  degree: string[];
  email: string;
  website: string;
  description: string;
  membership: ("kreisel" | "fil" | "bvl" | "legaKids")[];
  image: { url?: string; file?: File };
  inReview?: boolean;
  wantsPublicProfile?: boolean;
};

export const fetchProfileData = async (email: string, client: SanityClient) => {
  const fetchResult = await client.fetch<{
    profile?: profileQueryResult;
    allowMember: boolean;
    allowProfile: boolean;
    profileImage?: string | null;
    inReview?: boolean;
  } | null>(
    `*[_type == "member" && email.current == '${email}' ][0]{
     'profile':{${profileQuery}},
     'profileImage': image.asset-> url + '?w=300' ,
      allowMember,
      allowProfile,
      'inReview':_id in path("drafts.**")
    }`
  );

  if (!fetchResult) return null;

  const cleanFields = fetchResult.profile ? clean(fetchResult?.profile) : {};
  const castFields = fetchResult.allowProfile
    ? schema.cast(cleanFields, { stripUnknown: true })
    : memberSchema.cast(cleanFields, { stripUnknown: true });

  return {
    profileImage: fetchResult.profileImage,
    profile: castFields,
    allowMember: !!fetchResult.allowMember,
    allowProfile: !!fetchResult.allowProfile,
    inReview: fetchResult.inReview,
  };
};

export type fetchProfileDataResult = Awaited<
  ReturnType<typeof fetchProfileData>
>;

function clean<T>(obj: T) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}
