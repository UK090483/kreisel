import FooterContact from "./FooterContact";
import { Section } from "components/Section/Section";
import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";
import React from "react";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { headerRichTextQuery } from "PageBuilder/RichText/headerRichText/defaultRichText.query";
import { Link } from "components/Link";

interface FooterProps {}

export const footerQuery = `
'footer': {
  ...*[_id == 'siteConfig'][0]{
    
    'footerImage':footerImage{${imageQuery}},
    'contact':coalesce(^.contacts,^.pageType->contacts,contacts[0])->{
      'content':${headerRichTextQuery},
      'persons':persons[]->{_id,name,position,description,'avatar':avatar{${imageQuery}}},
      },
    'imprint':imprintPage->slug.current,
    'agb':agbPage->slug.current,
    'bla':'blu',
  }
}
`;
export interface FooterQueryResult {
  footer?: {
    footerImage?: ImageResult;
    contact?: {
      content?: any;
      persons?: {
        description?: string | null;
        avatar?: ImageResult;
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
      <Section bg="primary-light" width="l" className="pt-12"></Section>
      <div className="flex w-full max-w-6xl items-center justify-end gap-4 px-8 py-4 text-white">
        {data?.footer?.imprint && (
          <Link href={data?.footer.imprint}>Impressum</Link>
        )}
        {data?.footer?.agb && <Link href={data?.footer.agb}>Agb</Link>}
      </div>
    </footer>
  );
};

export default Footer;
