import Content from "components/Atoms/Content";
import RichText, {
  PortableTextSource,
} from "PageBuilder/RichText/PortableText";

import React from "react";

const ContentAdapter = (props: React.ComponentProps<typeof Content>) => {
  return <RichText {...props} />;
};

export const validateContentSource = (content: any) => {
  const _content = content as PortableTextSource;
  return !!_content && Array.isArray(_content) && _content.length > 0;
};

export default ContentAdapter;
