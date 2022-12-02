export const profileQuery = `
firstName,
name,
jobDescription,
surgery,
addressSupplement,
`;

type Profile = {
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
};
