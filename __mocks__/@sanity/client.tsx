// import sanityClient from "@sanity/client";

// jest.genMockFromModule("@sanity/client");

// export default sanityClient;

const sanityAutoMock = () => () => ({
  fetch: () => {
    console.log("mocked sanity client");
  },
});

export default sanityAutoMock;
