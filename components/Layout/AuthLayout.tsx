import { BackButton } from "./BackButton";
import Kreisel from "components/Kreisel";
import { PropsWithChildren, FC } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-xLight px-3">
      <BackButton />
      <div className=" w-full max-w-md rounded-theme border-2 border-primary bg-primary-light px-5 py-10 md:px-20 md:py-20">
        <div className="mx-auto mb-20 w-1/2 sm:w-2/3">
          <Kreisel />
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
