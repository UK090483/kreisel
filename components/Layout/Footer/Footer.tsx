import FooterContact from "./FooterContact";
import { Section } from "components/Section/Section";
import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import React from "react";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { headerRichTextQuery } from "PageBuilder/RichText/headerRichText/defaultRichText.query";
import { Link } from "components/Link";

interface FooterProps {}

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
    
    'footerImage':footerImage{${imageMeta}},
    'contact':coalesce(^.contacts,^.pageType->contacts,contacts[0])->{
      'content':${headerRichTextQuery},
      'persons':persons[]->{_id,name,position,description,'avatar':avatar{${imageMeta}}},
      },
    'imprint':imprintPage->slug.current,
    'agb':agbPage->slug.current,
    'bla':'blu',
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
    imprint?: string | null;
    agb?: string | null;
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
      <div className="flex items-center justify-end gap-4 text-white w-full max-w-6xl px-8 py-4">
        {data?.footer.imprint && (
          <Link href={data?.footer.imprint}>Impressum</Link>
        )}
        {data?.footer.agb && <Link href={data?.footer.agb}>Agb</Link>}
      </div>
    </footer>
  );
};

export default Footer;
