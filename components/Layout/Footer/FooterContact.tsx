import SanityImage from "@lib/SanityImage";
import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import React from "react";
import { PageData } from "pages/[[...slug]]";
import Avatar from "@components/Avatar";

interface FooterContactProps {
  data: PageData | null;
}

const FooterContact: React.FC<FooterContactProps> = (props) => {
  const { data } = props;

  const image = data?.footer.footerImage;

  return (
    <Section width="l" className="grid grid-cols-1 py-24 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center ">
        <Avatar
          size="m"
          image={image}
          title={"Marieke Klein  Leitung KREISEL e. V."}
        />
      </div>

      <div className="p-16">
        <Typo variant={"h1"}>Sie haben Fragen?</Typo>
        <Typo variant="body-l">Rufen Sie uns an oder mailen Sie uns</Typo>
        <Typo variant="body-l">
          Wir sind Montag bis Freitag von 8:00 bis 17:30 Uhr für Sie da.
        </Typo>
      </div>
    </Section>
  );
};

export default FooterContact;
