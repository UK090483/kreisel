import { object, string } from "yup";

export const schema = object({
  firstName: string(),
  name: string(),
  jobDescription: string(),
  city: string(),
});

export type Profile = {
  firstName: string;
  name: string;
  jobDescription: string;
  surgery: string;
  addressSupplement: string;
  street: string;
  city: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  description: string;
  membership: "kreisel" | "fil" | "bvl" | "legaKids";
  allowProfile: boolean;
};
