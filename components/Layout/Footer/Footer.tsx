import { Section } from "@components/organisms/Section/Section";
import NavOverview from "@privateModules/Navigation/NavOverview";
import { NavItem } from "@privateModules/Navigation/types";
import React from "react";
import FooterContact from "./FooterContact";

interface FooterProps {
  navItems: NavItem[];
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
        <NavOverview items={navItems} className="w-full py-24  " />
      </Section>

      <div className="flex items-center justify-between w-full max-w-6xl px-8 "></div>
    </footer>
  );
};

export default Footer;
