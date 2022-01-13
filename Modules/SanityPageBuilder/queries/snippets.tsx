import { Link } from "types";

export const linkQuery = `
   ...,
  'internalLink': select(
                 defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
                 defined(internalLink) => '/'+ internalLink->slug.current  
                 ),
 'href': select(
            defined(externalLink) && !!defined(internalLink) => externalLink,
            defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
            defined(internalLink) => '/'+ internalLink->slug.current  
          ),
  'external': select(defined(externalLink)=>true,defined(internalLink)=>false) 
`;

export interface LinkResult extends Omit<Link, "internalLink"> {
  internalLink?: string | null;
  href?: string | null;
  external?: boolean;
}

export const imageMeta = `
    alt,
    asset,
    crop,
    customRatio,
    hotspot,
    "id": asset->assetId,
    "type": asset->mimeType,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    "lqip": asset->metadata.lqip
`;

export type ImageMetaResult = {
  alt: string | null;
  asset: any;
  customRation: number;
  hotspot?: { x: number; y: number } | null;
  crop?: { bottom: number; top: number; right: number; left: number } | null;
  id: string;
  type: string;
  aspectRatio: number;
  lqip: string;
  fill?: "fill" | "contain";
};

export type SeoResult = {
  metaTitle: string;
  metaDesc: string;
  shareTitle: string;
  shareGraphic: ImageMetaResult;
  shareDesc: string;
  siteTitle: string;
  url: string;
  shareGraphicSrc: string;
};
