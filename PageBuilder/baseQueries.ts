export const linkQuery = `
 'href': select(
            defined(internalLink) && defined(internalLink->pageType) && defined(onPage)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current + '#'+ onPage,
            defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
            defined(internalLink) && defined(onPage) => '/'+ internalLink->slug.current + '#'+ onPage,
            defined(internalLink) => '/' + internalLink->slug.current,
            defined(externalLink) => externalLink
          ),
  'external': defined(externalLink),
  onPage,
`;

export interface LinkResult {
  href?: string | null;
  external?: boolean;
  onPage?: string | null;
}

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
