import Kreisel from "@components/Kreisel";
import Typo from "@components/Typography/Typography";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const VerifyRequest: NextPageWithLayout<{}> = () => {
  return (
    <div className="h-screen flex justify-center  bg-secondary px-5 ">
      <div className=" pt-20 ">
        <div className="w-1/2 sm:w-2/3 mx-auto">
          <Kreisel />
        </div>

        <Typo variant="h1">CHECK YOUR EMAIL</Typo>
      </div>
    </div>
  );
};

VerifyRequest.getLayout = function getLayout(page) {
  return <>{page}</>;
};
export default VerifyRequest;
