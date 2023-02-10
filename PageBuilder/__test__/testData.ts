export const testData = {
  contentType: {
    one: { name: "contentType1_name", title: "contentType1_title" },
    two: { name: "contentType2_name", title: "contentType2_title" },
  },
  linkQuery: "'internal':internal->slug.current ,href, ",
  linkQueryEn:
    "...(internal->{ 'internal': coalesce(slug_en,slug).current }) ,href, ",

  finalConfig: {
    options: {
      link: { query: () => "testLinkQuery" },
      image: { query: () => "testImageQuery" },
      slug: { query: () => "testSlugQuery" },
    },
  },
};
