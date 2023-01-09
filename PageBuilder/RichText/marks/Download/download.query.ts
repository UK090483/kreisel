export type DownloadResult = {
  url?: string | null;
};
export const downloadQuery = `
    _type == "download" => {
       'url': asset->url,
      _key,
      }`;
