import Button from "components/Atoms/Button/Button";
import Input from "components/Molecules/Inputs/Input";
import AuthLayout from "components/Organism/Layout/AuthLayout";

import authRoutes from "@lib/Auth/authRoutes";
import React, { ReactElement, ReactNode, useState } from "react";

import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, AnyObjectSchema } from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

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
const SignIn: NextPageWithLayout<LoginProps> = () => {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`/api/auth/sendMagicLink?email=${data.email}`, {
        method: "post",
        body: JSON.stringify({ email: data.email }),
      });

      if (res.status === 404) {
        setError("der user ist nicht zu finden ");
      }
      if (res.ok) {
        router.push(`/${authRoutes.pages.checkMail}`);
      }
    } catch (e) {
      console.log(e);

      // handle your error
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
  return <AuthLayout backHref="/">{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default SignIn;
