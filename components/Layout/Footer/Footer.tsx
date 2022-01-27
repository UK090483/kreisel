import { Section } from "@components/organisms/Section/Section";
import NavOverview from "@privateModules/Navigation/NavOverview";
import { NavItem } from "@privateModules/Navigation/types";
import { imageMeta, ImageMetaResult } from "@privateModules/SanityImage/query";
import { PageData } from "pages/[[...slug]]";
import React from "react";
import FooterContact from "./FooterContact";

interface FooterProps {
  data: PageData | null;
}

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
    'footerImage':footerImage{${imageMeta}}
  }
}
`;

export interface FooterQueryResult {
  footer: {
    footerImage: ImageMetaResult;
  };
}

const Footer: React.FC<FooterProps> = (props) => {
  const { data } = props;

  return (
    <footer
      data-testid="footer"
      className="flex flex-col items-center bg-primary "
    >
      <FooterContact data={data} />
      <Section bg="primary" width="l" className="pt-12">
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
