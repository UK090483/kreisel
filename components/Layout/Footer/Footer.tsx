import { Section } from "@components/Section/Section";
import NavOverview from "@lib/Navigation/NavOverview";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import { PageData } from "pages/[[...slug]]";
import React from "react";
import FooterContact from "./FooterContact";

interface FooterProps {
  data: PageData | null;
}

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
    'footerImage':footerImage{${imageMeta}},
    'contact':coalesce(^.contacts,contacts[0])->{
      content,
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
  const { data } = props;

  return (
    <footer
      data-testid="footer"
      className="flex flex-col items-center bg-primary-light"
    >
      <FooterContact data={data} />
      <Section bg="primary-light" width="l" className="pt-12">
        <NavOverview
          items={data?.navigation || []}
          className="w-full py-24  "
        />
      </Section>

      <div className="flex items-center justify-between w-full max-w-6xl px-8 "></div>
    </footer>
  );
};

export default Footer;
