/* eslint-disable no-underscore-dangle */
import React from "react";

import type { AppLocales } from "types";

import { BlockFactory } from "./BlockFactory";

export type BodyParserProps = {
  content: any[];
  lang?: AppLocales;
  extraComponents?: { [k: string]: React.ReactElement };
  blockFactory: BlockFactory;
};

const BodyParser: React.FC<BodyParserProps> = (props) => {
  const { content, lang, extraComponents, blockFactory } = props;

  return (
    <>
      {content &&
        content.map((block) => {
          if (extraComponents && extraComponents[block._type]) {
            return extraComponents[block._type];
          }

          if (blockFactory.getComponent(block._type, { ...block })) {
            return blockFactory.getComponent(block._type, {
              ...block,
              key: block._key,
              lang,
            });
          }
          return (
            <div key={block._key}>
              Component {JSON.stringify(block._type)} is not defined. Add it to
              components.js
            </div>
          );
        })}
    </>
  );
};

export default BodyParser;
