import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";
import { headerRichTextQuery } from "PageBuilder/RichText/headerRichText/defaultRichText.query";

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
      ...,
    
    'footerInfo': footer[0]->{

      'items':items[]{
        ...,
        'content':${headerRichTextQuery},
      }
    
    },
    'contact':coalesce(^.contacts,^.pageType->contacts,contacts[0])->{
      'content':${headerRichTextQuery},
      'persons':persons[]->{_id,name,position,description,'avatar':avatar{${imageQuery}}},
      },
  }
}
`;

interface IFooterContact {
  content?: any;
  persons?: {
    description?: string | null;
    avatar?: ImageResult;
    name?: string;
    position?: string;
    _id: string;
  }[];
}

export interface IFooterInfoItem {
  _key: string;
  content?: any;
}
interface IFooterInfo {
  items?: IFooterInfoItem[];
}

export interface FooterQueryResult {
  footer?: {
    footerInfo?: IFooterInfo;
    contact?: IFooterContact;
    imprint?: string | null;
    agb?: string | null;
  };
}
