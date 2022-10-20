export type DownloadResult = {
  //   title?: string | null;
  //   text?: string | null;
  //   _key: string;
  url?: string | null;
};
export const downloadQuery = `
    _type == "download" => {
       'url': asset->url,
      _key,
    
      }`;
