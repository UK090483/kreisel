"use client";
import { ISectionProps } from "./Section";
import React from "react";

type SectionContextValues = {
  bgColor?: string;
  width?: string;
};

const SectionContext = React.createContext<ISectionProps>({});

export const SectionContextProvider: React.FC<ISectionProps> = ({
  children,
  ...rest
}) => {
  return (
    <SectionContext.Provider value={{ ...rest }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  return React.useContext(SectionContext);
};
