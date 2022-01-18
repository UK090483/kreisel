import getPreviewApi from "privateModules/SanityPageBuilder/lib/preview/previewApi";
import { sanityClient as client } from "@services/SanityService/sanity.server";
const prevApi = getPreviewApi({ client });
export default prevApi;
