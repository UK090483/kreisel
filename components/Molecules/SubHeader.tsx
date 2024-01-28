"use client";
import Typo from "components/Atoms/Typography/Typography";
import { useAuth } from "lib/Auth/AuthContext";
import UserWidget from "lib/Auth/AuthWidget";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import clsx from "clsx";

import React from "react";

const Subheader = () => {
  const { isAuthenticated } = useAuth();
  const { data } = useAppContext();

  return (
    <div
      className={clsx(`hidden py-1 lg:flex justify-center bg-opacity-75 `, {
        "bg-lime-400": isAuthenticated,
        "bg-primary-light": !isAuthenticated,
      })}
    >
      <div className=" mx-auto flex flex-wrap items-center justify-between  px-3 container">
        {data?.contactPhone && (
          <Typo variant="body-s" space={false}>
            Kostenlose Beratung: {data?.contactPhone}
          </Typo>
        )}
        <UserWidget />
      </div>
    </div>
  );
};

export default Subheader;
