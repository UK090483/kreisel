import Typo from "components/Typography/Typography";
import { useAuth } from "lib/Auth/AuthContext";
import UserWidget from "lib/Auth/AuthWidget";
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
          className={clsx(`hidden py-2 sm:block`, {
            "bg-lime-400": isAuthenticated,
            "bg-primary-light": !isAuthenticated,
          })}
        >
          <div className=" mx-auto flex flex-wrap items-center justify-between  px-3 lg:container">
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
