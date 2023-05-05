import FooterContact from "./FooterContact";
import FooterInfo from "./FooterInfo";
import { IFooterContact, IFooterInfo } from "../Footer.query";
import React from "react";
import { Section } from "components/Section/Section";

interface FooterProps {
  contact: IFooterContact;
  footerInfo: IFooterInfo;
}

const Footer: React.FC<FooterProps> = ({ contact, footerInfo }) => {
  return (
    <footer data-testid="footer">
      <FooterContact contact={contact} />
      <FooterInfo footerInfo={footerInfo} />

      <Section
        bg="primary-xLight"
        className="flex items-center justify-center gap-4 px-8 py-4 text-sm"
      >
        KREISEL e.V. © 2023
      </Section>
    </footer>
  );
};

export default Footer;
