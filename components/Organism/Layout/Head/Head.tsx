import React from "react";
import { NextSeo } from "next-seo";
import { useAppContext } from "PageBuilder/AppContext/AppContext";

interface HeadProps {}

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://kreisel";

const Head: React.FunctionComponent<HeadProps> = () => {
  const { data } = useAppContext();
  const url = `${baseUrl}${data?.slug}`;
  const title = data?.title ? `KREISEL e.V. | ${data?.title}` : "KREISEL e.V.";

  const image = data?.image;

  return (
    <>
      <NextSeo
        title={title}
        description={data?.description ? data?.description : ""}
        noindex={false}
        nofollow={false}
        canonical={url}
        additionalLinkTags={[{ rel: "icon", href: "/Kreisel.png" }]}
        openGraph={{
          type: "website",
          images: [
            ...(image?.url
              ? [
                  {
                    url: image?.url + "?w=1200&h=630&fit=clip",
                    width: 1200,
                    height: 600,
                    alt: image?.alt ? image?.alt : `${title} Site preview`,
                  },
                ]
              : []),
          ],
        }}
      />
    </>
  );
};

export default Head;
