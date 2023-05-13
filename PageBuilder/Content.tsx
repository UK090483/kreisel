import { Hero, Section, Listing, Trust } from "components";
import BodyParser from "lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/frontend/ReuseableBlock";
import { ContentResult } from "PageBuilder/composedQueries";
import React from "react";

const Content = (props: { content?: ContentResult }) => {
  return (
    <BodyParser
      //@ts-ignore
      content={props?.content || []}
      components={{
        //@ts-ignore
        hero: { component: Hero },
        section: {
          //@ts-ignore
          component: Section,
        },
        listing: {
          //@ts-ignore
          component: Listing,
        },

        trust: {
          //@ts-ignore
          component: Trust,
        },
        reusable: {
          //@ts-ignore
          component: ReusableBlock,
        },
      }}
    />
  );
};

export default Content;
