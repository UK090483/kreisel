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
          return <Hero key={props._key} {...props} />;
        }
        if (props._type === "section") {
          return <Section key={props._key} {...props} />;
        }
        if (props._type === "listing") {
          return <Listing key={props._key} {...props} />;
        }
        if (props._type === "trust") {
          return <Trust key={props._key} {...props} />;
        }
        if (props._type === "reusable") {
          return <ReusableBlock key={props._key} {...props} />;
        }
      }}
    />
  );
};

export default Content;
