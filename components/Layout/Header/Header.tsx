import Typo from "@components/Typography/Typography";
import UserWidget from "@services/AuthService/AuthWidged";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <div
        style={{ transition: "top 0.4s" }}
        className={`fixed top-0 left-0 right-0 z-20 bg-white `}
      >
        <div className={`hidden sm:block py-2 bg-primary-light `}>
          <div className=" px-3 mx-auto flex items-center flex-wrap  justify-between lg:container">
            <Typo variant="body-s" space={false}>
              Kostenlose Beratung: 040 38 61 23 71
            </Typo>
            <UserWidget />
          </div>
        </div>
        {children}
      </div>

      <div className="h-[65px] sm:h-[90px]"></div>
    </>
  );
};
