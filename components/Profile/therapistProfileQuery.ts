// TODO adding description as block | image
export const therapistProfileQuery = `
firstName,
name,
email,
jobDescription,
street,
zipCode,
city,
phone,
website,
education,
degrees,
`;

export interface TherapistProfileResult {
  firstName?: string | null;
  name?: string | null;
  email?: string | null;
  jobDescription?: string | null;
  street?: string | null;
  zipCode?: string | null;
  city?: string | null;
  phone?: string | null;
  website?: string | null;
  education?: string | null;
  degrees?: string | null;
}
