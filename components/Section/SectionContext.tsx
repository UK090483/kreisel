"use client";
import { SectionProps } from "./Section";
import React from "react";

type SectionContextValues = {
  bgColor?: string;
  width?: string;
};

const SectionContext = React.createContext<SectionProps>({});

export const SectionContextProvider: React.FC<SectionProps> = ({
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
