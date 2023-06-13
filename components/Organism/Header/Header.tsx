import Navigation from "components/Molecules/Navigation";
import Subheader from "components/Molecules/SubHeader";
import React, { ComponentProps } from "react";

type HeaderProps = {} & ComponentProps<typeof Navigation>;

const Header: React.FC<HeaderProps> = ({ items }) => {
  return (
    <>
      <div className="fixed  top-0 left-0 right-0 z-20 bg-white bg-opacity-50  backdrop-blur-lg">
        <Subheader />
        <Navigation items={items} />
      </div>
      <div className="h-[65px] sm:h-[90px]"></div>
    </>
  );
};

export default Header;
