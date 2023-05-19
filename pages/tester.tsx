import NavigationMenu from "components/Molecules/Navigation/New/Headless Ui/NavigationMenu";
import {
  linkItem,
  listItem,
  MultiListItem,
} from "components/Molecules/Navigation/New/testData";

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
