import FooterContact from "./FooterContact";
import FooterInfo from "./FooterInfo";
import React from "react";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { Section } from "components/Section/Section";

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
  const { data } = useAppContext();
  return (
    <footer
      data-testid="footer"
      // className="flex flex-col items-center bg-primary-light"
    >
      <FooterContact />
      <FooterInfo />

      <Section
        bg="primary-xLight"
        className="flex items-center justify-center gap-4 px-8 py-4 text-sm"
      >
        KREISEL e.V. © 2023
        {/* {data?.footer?.imprint && (
          <Link href={data?.footer.imprint}>Impressum</Link>
        )}
        {data?.footer?.agb && <Link href={data?.footer.agb}>Agb</Link>} */}
      </Section>
    </footer>
  );
};

export default Footer;
