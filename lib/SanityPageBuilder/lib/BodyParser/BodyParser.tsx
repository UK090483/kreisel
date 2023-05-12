import React, { ComponentType } from "react";

type pageBuilderBlock = { _type: string; [k: string]: any };
type pageBuilderBlocks = pageBuilderBlock[];

type BodyParserProps<T extends pageBuilderBlocks> = {
  components: {
    [K in T[number] as K["_type"]]: { component: ComponentType<K> };
  };
  content: T;
};

function BodyParser<T extends pageBuilderBlocks>(props: BodyParserProps<T>) {
  const { components, content } = props;

  return (
    <>
      {content &&
        content.map((block) => {
          //@ts-ignore
          if (components[block._type]) {
            //@ts-ignore
            const Component = components[block._type].component;
            return <Component key={block._key} {...block} />;
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
