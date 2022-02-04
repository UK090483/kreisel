const remoteUrl = `https://kreisel-ie23otl8b-konradullrich.vercel.app`;
const localUrl = `http://localhost:3000`;

const previewSecret = "j8heapkqy4rdz6kudrvsc7ywpvfhrv022abyx5zgmuwpc1xv";
export default function resolveProductionUrl(doc) {
  const baseUrl =
    window.location.hostname === "localhost" ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview/start`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`id`, doc._id ?? `/`);

  return previewUrl.toString();
}
