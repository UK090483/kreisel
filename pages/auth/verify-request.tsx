import AuthLayout from "components/Layout/AuthLayout";
import Typo from "components/Typography/Typography";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const VerifyRequest: NextPageWithLayout<{}> = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col place-items-center">
        {/* <div className=" flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 ">
          <svg
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" h-full  w-full stroke-black stroke-2"
          >
            <path d="M5.5 24.75L20 39.25L44.5 10.75" />
          </svg>
        </div> */}

        <Typo className="text-center" variant="h1">
          CHECK YOUR EMAIL
        </Typo>
      </div>
    </AuthLayout>
  );
};

VerifyRequest.getLayout = function getLayout(page) {
  return <>{page}</>;
};
// eslint-disable-next-line import/no-unused-modules
export default VerifyRequest;
