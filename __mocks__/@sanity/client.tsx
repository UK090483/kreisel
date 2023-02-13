const patch = jest.fn().mockImplementation(() => ({
  append: jest.fn().mockImplementation(() => patch()),
  commit: jest.fn().mockImplementation(() => {}),
}));

const sanityAutoMock = () => {
  return {
    fetch: jest.fn().mockImplementation(() => {
      console.log("calling mock fetch");
    }),
    patch,
  };
};

export default sanityAutoMock;
