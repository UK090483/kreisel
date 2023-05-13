import { imageQuery, ImageResult } from "PageBuilder/baseQueries";
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

export const footerContactQuery = `
'contact':contacts[0]->{
  'content':${headerRichTextQuery},
  'persons':persons[]->{_id,name,position,description,'avatar':avatar{${imageQuery}}},
  },
`;

export interface IFooterContact {
  content?: any;
  persons?: {
    description?: string | null;
    avatar?: ImageResult;
    name?: string;
    position?: string;
    _id: string;
  }[];
}

export const footerInfoQuery = `
'footerInfo': footer[0]->{
  'items':items[]{
    ...,
    'content':${headerRichTextQuery},
  }
},
`;

export interface IFooterInfoItem {
  _key: string;
  content?: any;
}
export interface IFooterInfo {
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
