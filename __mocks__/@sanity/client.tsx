const sanityAutoMock = () => {
  return {
    fetch: () => {
      console.log("calling mock fetch");
    },
  };
};

export default sanityAutoMock;
