import { Hero } from "components";

const Home = () => {
  return (
    <div className=" mt-12 bg-blue-300 h-screen ">
      <Hero />
    </div>
  );
};
//@ts-ignore
Home.getLayout = function getLayout(page) {
  return <div className="">{page}</div>;
};

// eslint-disable-next-line import/no-unused-modules
export default Home;
