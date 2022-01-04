import { Section } from "@components/Section";
import React from "react";
import Card from "./Card/Card";

interface Props {}

export const Carousel = (props: Props) => {
  return (
    <Section
      bg="grey"
      width="l"
      className="flex justify-between py-64"
    ></Section>
  );
};
