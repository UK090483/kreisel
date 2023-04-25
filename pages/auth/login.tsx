import Button from "components/Button/Button";
import Kreisel from "components/Kreisel";
import Input from "components/Inputs/Input";
import React, { ReactElement, ReactNode } from "react";
import { getSession, getCsrfToken } from "next-auth/react";
import { NextPage } from "next";
import { Session } from "next-auth";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, AnyObjectSchema } from "yup";

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

const validation = object({
  email: string().required().email(),
});
const SignIn: NextPageWithLayout<LoginProps> = (props) => {
  const { csrfToken } = props;

  const methods = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver<AnyObjectSchema>(validation),
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const canSubmit = isDirty ? isValid : true;

  return (
    <div className="flex h-screen items-center justify-center bg-grey-light px-5">
      <div className="h-fit rounded-theme bg-primary-light p-20">
        <div className="mx-auto w-1/2 sm:w-2/3">
          <Kreisel />
        </div>
        <FormProvider {...methods}>
          <form
            className=" pt-20 "
            method="post"
            action="/api/auth/signin/email"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <Input name="email" placeholder="Email" />

            <Button
              className={`mt-2 inline w-full`}
              type="submit"
              disabled={!canSubmit}
            >
              Login
            </Button>

            <Button className="mt-2 block w-full" href={"/"}>
              Back to HomePage
            </Button>
          </form>
        </FormProvider>
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
