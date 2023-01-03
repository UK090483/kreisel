import { previewClient } from "@services/SanityService/sanity.server";
import handler from "lib/Profile/profileEndpoint";
import { getToken } from "next-auth/jwt";

export default handler(previewClient, getToken);
