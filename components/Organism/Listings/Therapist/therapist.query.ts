import { Profile } from "@lib/Profile/validation";
import { imageQuery, ImageResult } from "PageBuilder/baseQueries";

export const therapistQuery = `
...,
'image':image{${imageQuery}},
'email':email.current,
`;

export type TherapistResult = Omit<Profile, "image"> & {
  _id: string;
  image: ImageResult;
  email: string;
};
