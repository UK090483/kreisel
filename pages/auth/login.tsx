import Button from "components/Button/Button";
import Kreisel from "components/Kreisel";
import Input from "components/Inputs/LoginInput";
import React, { ReactElement, ReactNode } from "react";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import { NextPage } from "next";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";

type LoginProps = {
  csrfToken?: string | undefined;
  session?: Session | null;
};

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Inputs = {
  email: string;
};
const SignIn: NextPageWithLayout<LoginProps> = (props) => {
  const { csrfToken } = props;

  const {
    register,

    trigger,
    formState: { isDirty, isValid, errors },
  } = useForm<Inputs>({ mode: "onTouched" });

  const canSubmit = isDirty && isValid;
  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    trigger();

    signIn("email", { email: "web@konradullrich.com", name: "bla" });

    e.preventDefault();
    if (canSubmit) return;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-grey-light px-5">
      <div className="h-fit rounded-theme bg-primary-light p-20">
        <div className="mx-auto w-1/2 sm:w-2/3">
          <Kreisel />
        </div>
        <form
          className=" pt-20 "
          method="post"
          action="/api/auth/signin/email"
          // onSubmit={_handleSubmit}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label
            className={`block text-sm font-bold ${
              errors["email"] ? "text-red" : ""
            }`}
          >
            <span className="block">
              Email {errors["email"] && " " + errors["email"].message}
            </span>

            <Input
              {...register("email", {
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
                  message: "ist keine akzepierte mail adresse",
                },
                required: "muss ausgefüllt sein",
              })}
              className="mt-2 w-full "
              type="text"
              id="email"
              name="email"
              placeholder=" Email"
            />
          </label>
          <Button className={`mt-2 inline`} type="submit">
            Login
          </Button>
          <Button className=" mt-8 block w-full" href={"/"}>
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

  if (session && res && session.user) {
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
// eslint-disable-next-line import/no-unused-modules
export default SignIn;
