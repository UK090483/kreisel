import Button from "@components/Button/Button";
import { Section } from "@components/Section/Section";
import Typo from "@components/Typography";
import Underline from "@components/Underline";
import React from "react";

const Style = () => {
  return (
    <Section>
      <div className="container flex mx-auto ">
        <div className="container mx-auto ">
          <Typo space={false} variant="h1">
            H1
          </Typo>
          <Typo space={false} variant="h2">
            H2
          </Typo>
          <Typo space={false} variant="h3">
            H3
          </Typo>
          <Typo space={false} variant="h4">
            H4
          </Typo>
          <Typo space={false} variant="h5">
            H5
          </Typo>
          <Typo space={false} variant="body">
            body
          </Typo>
          <Typo space={false} variant="body-l">
            body
          </Typo>
        </div>
        <div className="container mx-auto ">
          <Typo space={false} hand variant="h1">
            H1
          </Typo>
          <Typo space={false} hand variant="h2">
            H2
          </Typo>
          <Typo space={false} hand variant="h3">
            H3
          </Typo>
          <Typo space={false} hand variant="h4">
            H4
          </Typo>
          <Typo space={false} hand variant="h5">
            H5
          </Typo>
          <Typo space={false} hand variant="body">
            body
          </Typo>
          <Typo space={false} hand variant="body-l">
            body
          </Typo>
        </div>
      </div>
    </Section>
  );
};

export default Style;
