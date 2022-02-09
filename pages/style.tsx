import Button from "@components/Button/Button";
import { Section } from "@components/Section/Section";
import Typo from "@components/Typography";
import Underline from "@components/Underline/Underline";
import React from "react";

const Style = () => {
  return (
    <Section>
      <div className="container  mx-auto py-8">
        <div className="container mx-auto mt-10 ">
          <Typo space={false} variant="h1">
            <Underline color="primary" variant={0}>
              Blaaaasdfjskl
            </Underline>
          </Typo>
          <Typo space={false} variant="h2">
            <Underline color="primary" variant={0}>
              Blaaaasdfjskl fg fgfg
            </Underline>
          </Typo>
          <Typo space={false} variant="h3">
            sdfjsdlfkj f
            <Underline color="primary" variant={3}>
              __sfdsdfkBlaaaasdfjskl
            </Underline>
          </Typo>
          <Typo space={false} variant="h4">
            <Underline color="primary" variant={0}>
              Blaaaasdfjskl
            </Underline>
          </Typo>

          <Typo space={false} variant="body">
            <Underline color="primary" variant={0}>
              Blaaaasdfjskl
            </Underline>
          </Typo>

          {/* <Typo space={false} variant="h2">
            <Underline color="primary" variant={2}>
              Blaaaasdfjskl
            </Underline>
          </Typo>
          <Typo space={false} variant="h3">
            <Underline on="hover" color="primary" variant={3}>
              Blaaaasdfjskl
            </Underline>
          </Typo> */}
        </div>
      </div>
      {/* <div className="container flex mx-auto ">
        <div className="container mx-auto ">
          <Underline variant={2}>
            <Typo space={false} variant="h1">
              H1
            </Typo>
          </Underline>
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
      </div> */}
    </Section>
  );
};

export default Style;
