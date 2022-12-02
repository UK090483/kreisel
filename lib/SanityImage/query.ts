export const imageMeta = `
alt,
crop,
hotspot,
...(asset->{
  url,
  'id':assetId,
  'type':mimeType,
  "aspectRatio": metadata.dimensions.aspectRatio,
  "lqip": metadata.lqip,
  'width': metadata.dimensions.width,
  'height': metadata.dimensions.height
}),
`;

export type ImageMetaResult = {
  alt: string | null;
  url?: string | null;
  hotspot?: { x: number; y: number } | null;
  crop?: { bottom: number; top: number; right: number; left: number } | null;
  id: string;
  type: string;
  aspectRatio: number;
  width: number;
  height: number;
  lqip: string;
  fill?: "fill" | "contain";
};
