import AuthLayout from "components/Organism/Layout/AuthLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const NotFountPage: NextPageWithLayout<{}> = () => {
  return (
    <div>
      <h1 className=" text-4xl font-bold w-full text-center">404</h1>
      <p> es konnte keine Seite unter dieser Adresse gefunden werden</p>
    </div>
  );
};

NotFountPage.getLayout = function getLayout(page) {
  return <AuthLayout backHref="/">{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default NotFountPage;
