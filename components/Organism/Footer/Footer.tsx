import FooterContact from "./FooterContact";
import FooterInfo from "./FooterInfo";
import Section from "components/Atoms/Section/Section";
import React, { ComponentProps } from "react";

interface FooterProps {
  contact?: ComponentProps<typeof FooterContact>;
  info?: ComponentProps<typeof FooterInfo>;
}

const Footer: React.FC<FooterProps> = ({ contact, info }) => {
  return (
    <footer data-testid="footer">
      <FooterContact {...contact} />
      <FooterInfo {...info} />

      <Section
        bgColor="primary-xLight"
        className="flex items-center justify-center gap-4 px-8 py-4 text-sm"
      >
        KREISEL e.V. © 2023
      </Section>
    </footer>
  );
};
export default Footer;
