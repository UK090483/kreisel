import SanityImage from "@privateModules/SanityImage";
import { Section } from "@components/organisms/Section/Section";
import Typo from "@components/Typography";

import React from "react";

interface FeatureProps {
  variant?: "overlapping" | "sideBySide";
}
const Feature: React.FC<FeatureProps> = ({ variant = "overlapping" }) => {
  return (
    <Section>
      <div className="grid-cols-12 mx-auto overflow-hidden md:grid ">
        <div
          style={{ zIndex: 1 }}
          className={` w-full md:w-[600px] pb-12  p-7 bg-salmon ${
            variant === "sideBySide"
              ? "col-start-1 self-stretch"
              : "col-start-2 self-center"
          }`}
        >
          <Typo variant="h1">Faire Löhne durch starke Stimmen</Typo>

          <div className="pt-12 pr-24">
            <Typo>
              Faire Löhne sind eines der wichtigsten Themen für unsere Branche,
              aber auch nicht einfach zu realisieren.
            </Typo>

            <br />
            <Typo>
              H&M zahlt Löhne nicht direkt, wie auch die meisten anderen
              Fashion-Marken. Wir besitzen die Fabriken nicht, sondern wir
              bezahlen für die Bestellung bei unseren Lieferant*innen.
            </Typo>
            <br />
            <Typo>
              Dennoch haben wir auf faire Löhne natürlich einen großen Einfluss.
              Wir arbeiten mit den Lieferant*innen, den
              Arbeitnehmervertreter*innen und den Regierungen vor Ort zusammen.
            </Typo>
          </div>
        </div>

        <div className="w-full h-[100vw] md:h-[600px] md:w-[600px] relative col-start-7">
          <SanityImage />

          {/* <Video /> */}
        </div>
      </div>
    </Section>
  );
};

export default Feature;
