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
