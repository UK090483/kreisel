import ContentAdapter, {
  validateContentSource as vC,
} from "components/Adapter/ContentAdapter";

import React from "react";

export type ContentSource = unknown;

type ContentProps = {
  content: ContentSource;
};

export const validateContentSource = vC;

const Content = (props: ContentProps) => {
  return <ContentAdapter {...props} />;
};

export default Content;
