import React, { ComponentType } from "react";

type BodyParserProps = {
  components: { [k: string]: { component: ComponentType<any> } };
  content: any[];
};
const BodyParser: React.FC<BodyParserProps> = (props) => {
  const { components, content } = props;

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
