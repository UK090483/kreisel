import React, { useContext } from "react";
import { IFieldProps } from "./Field";

const defaultState: IFieldProps = {
  name: "",
};

const FieldContext = React.createContext(defaultState);

export const FieldContextProvider: React.FC<IFieldProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <FieldContext.Provider value={{ ...rest }}>
      {children}
    </FieldContext.Provider>
  );
};

export const useFieldContext = () => {
  return useContext(FieldContext);
};
