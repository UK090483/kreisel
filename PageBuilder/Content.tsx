import { Hero, Section, Listing, Trust } from "components";
import BodyParser from "lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/frontend/ReuseableBlock";
import { ContentResult } from "PageBuilder/composedQueries";
import React from "react";

const Content = (props: ContentResult) => {
  return (
    <BodyParser
      content={props?.content || []}
      mapElements={(props) => {
        if (props._type === "hero") {
          return <Hero {...props} />;
        }
        if (props._type === "section") {
          return <Section {...props} />;
        }
        if (props._type === "listing") {
          return <Listing {...props} />;
        }
        if (props._type === "trust") {
          return <Trust {...props} />;
        }
        if (props._type === "reusable") {
          return <ReusableBlock {...props} />;
        }
      }}
    />
  );
};

export default Content;
