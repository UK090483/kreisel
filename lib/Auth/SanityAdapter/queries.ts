import groq from "groq";

export const memberType = "member";

export const getUserByIdQuery = groq`
  *[_type == '${memberType}' && _id == $id][0]
`;

export const getUserByProviderAccountIdQuery = groq`
  *[_type == 'account' && providerId == $providerId && providerAccountId == $providerAccountId][0].user->
`;

export const getUserByEmailQuery = groq`
  *[_type == '${memberType}' && email.current == $email][0]{...,'email':email.current}
`;

// const getVerificationRequestQuery = groq`
//   *[_type == 'verification-request' && identifier == $identifier][0]
// `;
