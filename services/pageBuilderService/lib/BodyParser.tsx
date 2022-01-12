/* eslint-disable no-underscore-dangle */
import React from "react";

import type { AppLocales } from "types";

import BlockFactory, { blockFactory } from "./BlockFactory";
import type { PageBodyResult } from "../ContentParser";

export type BodyParserProps = {
  content: PageBodyResult;
  lang?: AppLocales;
  extraComponents?: { [k: string]: React.ReactElement };
  blockFactory: BlockFactory;
};

const BodyParser: React.FC<BodyParserProps> = (props) => {
  const { content, lang, extraComponents } = props;

  return (
    <>
      {content &&
        content.map((blok) => {
          if (extraComponents && extraComponents[blok._type]) {
            return extraComponents[blok._type];
          }

          if (blockFactory.getComponent(blok._type, { ...blok })) {
            return blockFactory.getComponent(blok._type, {
              ...blok,
              key: blok._key,
              lang,
            });
          }
          return (
            <div key={blok._key}>
              Component {JSON.stringify(blok._type)} is not defined. Add it to
              components.js
            </div>
          );
        })}
    </>
  );
};

export default BodyParser;
