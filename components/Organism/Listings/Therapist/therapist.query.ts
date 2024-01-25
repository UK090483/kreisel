import { Profile } from "@lib/Profile/validation";
import { imageQuery, ImageResult } from "PageBuilder/baseQueries";

export const therapistQuery = `
_id,
title,
firstName,
name,
'image':image{${imageQuery}},
'email':email.current,
practice,
street,
zipCode,
city,
phone,
website,
description,
focus,
focusOther,
degree,
membership,
qualification,
offersInternship
  

`;

export type TherapistResult = Omit<Profile, "image"> & {
  _id: string;
  image: ImageResult;
  email: string;
};
