import { NextSeo } from "next-seo";
import { SeoType } from "./SeoQuerys";
import React from "react";

interface SeoProps extends SeoType {
  pageUrl?: string;
}

const Seo: React.FC<SeoProps> = (props) => {
  const { metaTitle, metaDesc, shareTitle, shareDesc, canonical, pageUrl } =
    props;
  const canUrl = `${pageUrl}/${canonical}`;

  return (
    <NextSeo
      nofollow={true}
      noindex={true}
      title={metaTitle}
      description={metaDesc}
      canonical={canUrl}
      openGraph={{
        url: canUrl,
        title: shareTitle,
        description: shareDesc,
        type: "page",
        images: [
          {
            url: "https://www.example.ie/og-image-01.jpg",
            width: 800,
            height: 600,
            alt: "Og Image Alt",
            type: "image/jpeg",
          },
          {
            url: "https://www.example.ie/og-image-02.jpg",
            width: 900,
            height: 800,
            alt: "Og Image Alt Second",
            type: "image/jpeg",
          },
          { url: "https://www.example.ie/og-image-03.jpg" },
          { url: "https://www.example.ie/og-image-04.jpg" },
        ],
        site_name: "SiteName",
      }}
    />
  );
};
export default Seo;
