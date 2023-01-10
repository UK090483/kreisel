import { previewClient } from "@services/SanityService/sanity.server";
import handler from "lib/Profile/profileEndpoint";
import { getToken } from "next-auth/jwt";

// eslint-disable-next-line import/no-unused-modules
export default handler(previewClient, getToken);
