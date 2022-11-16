import React from "react";
import NextHead from "next/head";

interface HeadProps {
  name?: string;
}

const Head: React.FunctionComponent<HeadProps> = ({ name }) => {
  return (
    <NextHead>
      <title>Kreisel e.V. {name ? `/ ${name}` : ""}</title>
      <meta
        name="description"
        content="Generated width love by create next app"
      />
      <meta name="robots" content="noindex"></meta>
      <meta name="robots" content="nofollow"></meta>
      <link rel="icon" href="/favicon-32x32.png" />
    </NextHead>
  );
};

export default Head;
