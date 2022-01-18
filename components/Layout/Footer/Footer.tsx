import { Section } from "@components/Section";
import { NavOverview } from "@services/NavigationService/NavOverview";
import { NavItem as NavItemType } from "@services/NavigationService/types";
import React from "react";
import FooterContact from "./FooterContact";
import Quote from "./Quotes/Quote";

interface FooterProps {
  navItems: NavItemType[];
}

export const footerQuery = `
'footer': {
  'article' : *[_type == 'article']{...}
}
`;

export interface FooterQueryResult {
  footer: string;
}

const Footer: React.FC<FooterProps> = ({ navItems }) => {
  return (
    <footer
      data-testid="footer"
      className="flex flex-col items-center bg-primary "
    >
      <FooterContact />
      <Section bg="primary" width="l" className="pt-12">
        <NavOverview
          items={navItems}
          className="w-full py-24 border-t-2 border-b-2"
        />
      </Section>

      <div className="flex items-center justify-between w-full max-w-6xl px-8 "></div>
    </footer>
  );
};

export default Footer;
