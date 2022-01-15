/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from "next/router";
import * as React from "react";

const PreviewIndicator: React.FC = () => {
  const { asPath } = useRouter();

  return (
    <a
      className="fixed p-3 font-bold text-red-500 border-4 border-red-500 rounded-md left-2 bottom-2"
      href={`/api/preview/stop?slug=${asPath}`}
    >
      Exit Preview
    </a>
  );
};

export default PreviewIndicator;
