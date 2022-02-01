import React, { ReactElement, ReactNode } from "react";
import { getSession, getCsrfToken } from "next-auth/react";
import Button from "@components/Button/Button";
import { NextPage } from "next";
import { Session } from "next-auth";
import Kreisel from "@components/Kreisel";

type LoginProps = {
  csrfToken?: string | undefined;
  session?: Session | null;
};

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const SignIn: NextPageWithLayout<LoginProps> = (props) => {
  const { csrfToken } = props;

  return (
    <div className="h-screen flex justify-center  bg-secondary px-5 ">
      <div className=" pt-20 ">
        <div className="w-1/2 sm:w-2/3 mx-auto">
          <Kreisel />
        </div>
        <form className=" pt-20 " method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="block  text-sm font-bold ">
            Email address
            <input
              className="w-full mt-2 rounded-theme bg-primary"
              type="text"
              id="email"
              name="email"
              placeholder=" Email"
            />
          </label>
          <Button className=" mt-2 inline " type="submit">
            Login
          </Button>
          <Button className=" mt-8 w-full block" href={"/"}>
            Back to HomePage
          </Button>
        </form>
      </div>
    </div>
  );
};

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return {};
  }

  return {
    session: await getSession(context),
    csrfToken: await getCsrfToken(context),
  };
};

SignIn.getLayout = function getLayout(page) {
  return <>{page}</>;
};
export default SignIn;
