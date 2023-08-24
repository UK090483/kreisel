import Kreisel from "components/Atoms/Kreisel";
import { BackButton } from "components/Organism/Layout/BackButton";
import clsx from "clsx";
import { PropsWithChildren, FC } from "react";

const Dialog: FC<
  PropsWithChildren<{
    className?: string;
    kreiselClassName?: string;
    onClose?: () => void;
  }>
> = ({ children, onClose, kreiselClassName, className }) => {
  return (
    <>
      <BackButton onclick={onClose} />
      <div
        className={clsx(
          "w-full max-w-md rounded-theme border-2 border-primary bg-primary-light px-5 py-10 md:px-20 md:py-20",
          className
        )}
      >
        <div className="mx-auto mb-20 w-1/2 sm:w-2/3">
          <Kreisel className={kreiselClassName} />
        </div>

        {children}
      </div>
    </>
  );
};

export default Dialog;
