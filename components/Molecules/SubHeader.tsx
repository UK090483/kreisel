"use client";
import Typo from "components/Atoms/Typography/Typography";
import { useAuth } from "lib/Auth/AuthContext";
import UserWidget from "lib/Auth/AuthWidget";
import clsx from "clsx";

import React from "react";

const Subheader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={clsx(`hidden py-1 sm:flex justify-center bg-opacity-75 `, {
        "bg-lime-400": isAuthenticated,
        "bg-primary-light": !isAuthenticated,
      })}
    >
      <div className=" mx-auto flex flex-wrap items-center justify-between  px-3 container">
        <Typo variant="body-s" space={false}>
          Kostenlose Beratung: 040 38 61 23 71
        </Typo>
        <UserWidget />
      </div>
    </div>
  );
};

export default Subheader;
