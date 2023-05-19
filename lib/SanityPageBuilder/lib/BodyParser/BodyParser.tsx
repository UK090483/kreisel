import React from "react";

type pageBuilderBlock = { _type: string; [k: string]: any };
type pageBuilderBlocks = pageBuilderBlock[];

type BodyParserProps<T extends pageBuilderBlocks> = {
  content: T;
  mapElements: (props: T[number]) => React.ReactElement | void;
};

function BodyParser<T extends pageBuilderBlocks>(props: BodyParserProps<T>) {
  const { content, mapElements } = props;

  return (
    <>
      {content &&
        content.map((block) => {
          const element = mapElements(block);
          if (element) {
            return element;
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
}

export default BodyParser;
