import groq from "groq";

export const getUserByIdQuery = groq`
  *[_type == 'user' && _id == $id][0]
`;

export const getUserByProviderAccountIdQuery = groq`
  *[_type == 'account' && providerId == $providerId && providerAccountId == $providerAccountId][0].user->
`;

export const getUserByEmailQuery = groq`
  *[_type == 'user' && email == $email][0]
`;

export const getVerificationRequestQuery = groq`
  *[_type == 'verification-request' && identifier == $identifier][0]
`;
