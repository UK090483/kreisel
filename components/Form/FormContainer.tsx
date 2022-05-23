import clsx from "clsx";
import * as React from "react";

interface IFormContainerProps {
  label?: string;
  columns?: 1 | 2 | 3 | 4;
  width?: "1/2" | "full";
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { children, label, columns, width } = props;

  return (
    <div
      className={clsx(
        "w-full p-4 border-2  border-primary-light rounded-theme",
        {
          "md:w-1/2": width === "1/2",
        }
      )}
    >
      {label && <div className="pt-4 pb-8 ">{label}</div>}
      <div
        className={clsx(" grid justify-center gap-8", {
          "md:grid-cols-1": columns === 1,
          "md:grid-cols-2": columns === 2,
          "md:grid-cols-3": columns === 3,
          "md:grid-cols-4": columns === 4,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
