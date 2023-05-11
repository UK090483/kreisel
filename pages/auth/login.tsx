import Button from "components/Atoms/Button/Button";
import Input from "components/Molecules/Inputs/Input";
import AuthLayout from "components/Organism/Layout/AuthLayout";
import React, { ReactElement, ReactNode } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
// import { getServerSession } from "next-auth/next"
import { GetServerSideProps, NextPage } from "next";
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

  console.log(props);

  const methods = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver<AnyObjectSchema>(validation),
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const canSubmit = isDirty && isValid;

  return (
    <FormProvider {...methods}>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input name="email" placeholder="Email" />
        <Button
          className={`mt-2 inline w-full`}
          type="submit"
          disabled={!canSubmit}
        >
          Login / SignUp
        </Button>
        <Button className="mt-2 block w-full" href={"/"}>
          Back to HomePage
        </Button>
      </form>

      <button
        onClick={() => {
          signIn("email", { email: "konradullrich@me.com" });
        }}
      >
        Boooooom
      </button>
    </FormProvider>
  );
};

// eslint-disable-next-line import/no-unused-modules
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  //const session = await getServerSession(req, res, authOptions)

  // if (session && res && session.user) {
  //   res.writeHead(302, {
  //     Location: "/",
  //   });
  //   res.end();
  //   return {};
  // }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
    },
  };
};

SignIn.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default SignIn;
