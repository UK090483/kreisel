import FooterContact from "./FooterContact";
import { Section } from "components/Section/Section";
// import NavOverview from "PageBuilder/Navigation/NavOverview";
import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import React from "react";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { headerRichTextQuery } from "PageBuilder/RichText/RichText";

interface FooterProps {}

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
    'footerImage':footerImage{${imageMeta}},
    'contact':coalesce(^.contacts,^.pageType->contacts,contacts[0])->{
      'content':${headerRichTextQuery},
      'persons':persons[]->{_id,name,position,description,'avatar':avatar{${imageMeta}}}
  }
  }
}
`;
export interface FooterQueryResult {
  footer: {
    footerImage: ImageMetaResult;
    contact?: {
      content?: any;
      persons?: {
        description?: string | null;
        avatar?: ImageMetaResult;
        name?: string;
        position?: string;
        _id: string;
      }[];
    };
  };
}

const Footer: React.FC<FooterProps> = (props) => {
  const { data } = useAppContext();

  return (
    <footer
      data-testid="footer"
      className="flex flex-col items-center bg-primary-light"
    >
      <FooterContact />
      <Section bg="primary-light" width="l" className="pt-12">
        {/* <NavOverview
          items={data?.navigation || []}
          className="w-full py-24  "
        /> */}
      </Section>
      <div className="flex items-center justify-between w-full max-w-6xl px-8 "></div>
    </footer>
  );
};

export default Footer;
