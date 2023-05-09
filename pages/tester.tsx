import NavigationMenu from "components/Navigation/NavigationMenu";
import {
  linkItem,
  listItem,
  MultiListItem,
} from "components/Navigation/testData";

const Home = () => {
  return (
    <div className=" mt-12 bg-blue-300 h-screen ">
      <NavigationMenu
        items={[
          MultiListItem(),
          listItem(),
          linkItem(),
          linkItem(),
          linkItem(),
          listItem(),
          MultiListItem(),
        ]}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Home;
