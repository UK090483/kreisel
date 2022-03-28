import React, { ComponentType } from "react";
import type { AppLocales } from "types";

export type BodyParserProps = {
  content: any[];
  lang?: AppLocales;
  components: { [k: string]: { component: ComponentType<any> } };
};

const BodyParser: React.FC<BodyParserProps> = (props) => {
  const { content, components } = props;
  return (
    <>
      {content &&
        content.map((block) => {
          if (components[block._type]) {
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
};

export default BodyParser;
