import Button from "components/Atoms/Button/Button";
import Input from "components/Molecules/Inputs/Input";
import AuthLayout from "components/Organism/Layout/AuthLayout";

import authRoutes from "@lib/Auth/authRoutes";
import { useAuth } from "@lib/Auth/AuthContext";
import React, { ReactElement, ReactNode, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AnyObjectSchema, object, string } from "yup";
// import useUser from "@lib/Auth/IronSession/useUser";

type LoginProps = {
  csrfToken?: string | undefined;
  session?: Session | null;
};

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Inputs = {
  email: string;
  password: string;
};

const validation = object({
  email: string().required().email(),
  password: string().min(5).required(),
});
const SignIn: NextPageWithLayout<LoginProps> = (props) => {
  const { refetchUser } = useAuth();

  const [error, setError] = useState("");

  const router = useRouter();

  const methods = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver<AnyObjectSchema>(validation),
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const canSubmit = isDirty && isValid;

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const res = await fetch(`/${authRoutes.api.login_credentials}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        refetchUser();
        router.push("/");
      }

      if (res.status === 404) {
        setError("Email und Password passen leider nicht zusammen");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
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

      <Link
        data-testid="toSignUp"
        className=" text-sm underline mt-8"
        href={`/${authRoutes.pages.signup}`}
      >
        Noch kein Member ?
      </Link>

      <div>{error && error}</div>
    </FormProvider>
  );
};

// eslint-disable-next-line import/no-unused-modules
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const csrfToken = await getCsrfToken(context);
  // return {
  //   props: {
  //     csrfToken,
  //   },
  // };

  return { props: { csrfToken: "bla" } };
};

SignIn.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default SignIn;
