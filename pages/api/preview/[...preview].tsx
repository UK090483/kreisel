import getPreviewApi from "lib/SanityPageBuilder/lib/preview/previewApi";
import { sanityClient as client } from "@services/SanityService/sanity.server";
const prevApi = getPreviewApi({ client });
// eslint-disable-next-line import/no-unused-modules
export default prevApi;
