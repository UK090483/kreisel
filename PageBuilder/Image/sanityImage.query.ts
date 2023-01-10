export const imageQuery = `
crop,
hotspot,
asset,
...(asset->{
  'alt':altText, 
    url,
    'aspectRatio':metadata.dimensions.aspectRatio,
    "lqip":metadata.lqip,
    'width':metadata.dimensions.width,
    'height':metadata.dimensions.height,  
    'palette':metadata.palette,
  }),
  alt
`;

export type ImageResult = {
  alt?: string | null;
  url?: string;
  hotspot?: { x: number; y: number } | null;
  crop?: { bottom: number; top: number; right: number; left: number } | null;
  aspectRatio: number;
  width: number;
  height: number;
  lqip: string;
};
