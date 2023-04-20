import { SanityDocumentLike, DocumentPluginOptions } from "sanity";
const remoteUrl = "https://kreisel.vercel.app/";
const localUrl = `http://localhost:3000`;

const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET;

export const resolveProductionUrlDocument = (
  document: SanityDocumentLike & { slug?: { current?: string } }
) => {
  if (!["page", "person"].includes(document?._type)) return;
  if (!document?.slug?.current) return;
  const baseUrl =
    window.location.hostname === "localhost" ? localUrl : remoteUrl;
  const docId =
    typeof document?._id === "string" && document._id.replace("drafts.", "");
  if (!docId) return;
  const previewUrl = new URL(baseUrl);
  previewUrl.pathname = `/api/preview/start`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`id`, docId);
  return previewUrl.toString();
};

export const resolveProductionUrl: DocumentPluginOptions["productionUrl"] =
  async (prev, context) => {
    return resolveProductionUrlDocument(context.document) || prev;
  };
