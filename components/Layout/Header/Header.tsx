import Typo from "components/Typography/Typography";
import useAuth from "lib/Auth/useAuth";
import UserWidget from "@services/AuthService/AuthWidged";
import clsx from "clsx";

import React from "react";

interface HeaderProps {
  children?: React.ReactNode;
}
export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div
        style={{ transition: "top 0.4s" }}
        className={`fixed top-0 left-0 right-0 z-20 bg-white `}
      >
        <div
          className={clsx(`hidden sm:block py-2 bg-primary-light `, {
            "bg-lime-400 ": isAuthenticated,
          })}
        >
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
