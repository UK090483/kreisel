export const profileQuery = `
...,
title,
firstName,
name,
jobDescription,
surgery,
addressSupplement,
degree
`;

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
  degree: string[];
  email: string;
  website: string;
  description: string;
  membership: "kreisel" | "fil" | "bvl" | "legaKids";
  allowProfile: boolean;
};
