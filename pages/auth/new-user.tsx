import Kreisel from "components/Kreisel";
import Typo from "components/Typography/Typography";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const VerifyRequest: NextPageWithLayout<{}> = () => {
  return (
    <div className="h-screen flex justify-center items-center  bg-grey-light px-5  ">
      <div className=" p-20 bg-primary-light h-fit rounded-theme">
        <div className="w-1/4 sm:w-2/3 mx-auto">
          <Kreisel />
        </div>
        <div className="flex flex-col place-items-center mt-12">
          <div className=" bg-white w-24 h-24 flex justify-center items-center rounded-full p-2 ">
            <svg
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" stroke-2  stroke-black w-full h-full"
            >
              <path d="M5.5 24.75L20 39.25L44.5 10.75" />
            </svg>
          </div>
          <Typo variant="h1">New User</Typo>
          <Typo variant="h1">CHECK YOUR EMAIL</Typo>
        </div>
      </div>
    </div>
  );
};

VerifyRequest.getLayout = function getLayout(page) {
  return <>{page}</>;
};
// eslint-disable-next-line import/no-unused-modules
export default VerifyRequest;
