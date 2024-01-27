/* eslint-disable import/no-anonymous-default-export */

const pages = {
  signIn: "auth/login",
  signup: "auth/signup",
  error: "auth/error",
  profile: "profile",
  checkMail: "auth/checkMail",
};

export default {
  api: {
    login: "api/auth/login",
    login_credentials: "api/auth/login_credentials",
    signup: "api/auth/signup",
    logout: "api/auth/logout",
  },
  pages,
  errors: {
    linkExpired: `${pages.error}?error=linkExpired`,
  },
};
