import AuthLayout from "components/Organism/Layout/AuthLayout";
import Typo from "components/Atoms/Typography/Typography";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const VerifyRequest: NextPageWithLayout<{}> = () => {
  return (
    <AuthLayout backHref="/">
      <div className="flex flex-col place-items-center">
        <Typo className="text-center" variant="h3">
          ÜBERPRÜFEN SIE IHRE E-MAILS.
        </Typo>
        <Typo className="text-center text-[0.8rem]">
          Bitte beachten Sie, dass der Versand von E-Mails gelegentlich etwas
          Zeit in Anspruch nehmen kann. Überprüfen Sie auch Ihr Spam-Postfach,
          falls Sie keine Bestätigung in Ihrem Hauptposteingang finden.
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
