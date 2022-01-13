/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from "react";

const PreviewIndicator: React.FC = () => {
  return (
    <a
      className="fixed p-3 font-bold text-red-500 border-4 border-red-500 rounded-md left-2 bottom-2"
      href="/api/clearPreview"
    >
      Exit Preview
    </a>
  );
};

export default PreviewIndicator;
