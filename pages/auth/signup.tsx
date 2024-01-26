import Button from "components/Atoms/Button/Button";
import Input from "components/Molecules/Inputs/Input";
import AuthLayout from "components/Organism/Layout/AuthLayout";
import authRoutes from "@lib/Auth/authRoutes";
import React, { ReactElement, ReactNode, useState } from "react";

import { NextPage } from "next";
import { Session } from "next-auth";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, AnyObjectSchema } from "yup";
import { useRouter } from "next/router";

type LoginProps = {
  csrfToken?: string | undefined;
  session?: Session | null;
};

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Inputs = {
  email: string;
  firstName: string;
  name: string;
};

export const validation = object({
  email: string().required("die Email ist erforderlich").email(),
  firstName: string().required("der Vorname ist erforderlich"),
  name: string().required("der Nachname ist erforderlich"),
});
const SignUp: NextPageWithLayout<LoginProps> = (props) => {
  const { csrfToken } = props;

  const router = useRouter();

  const [error, setError] = useState("");

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
      const res = await fetch(`/${authRoutes.api.signup}`, {
        method: "post",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      }
      if (res.ok) {
        router.push(`/${authRoutes.pages.checkMail}`);
      }
    } catch (e) {
      console.log(e);
      router.push(`/${authRoutes.pages.checkMail}`);
      // handle your error
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input name="email" placeholder="Email" />
        <Input name="firstName" placeholder="Vorname" />
        <Input name="name" placeholder="Nachname" />

        <Button
          className={`mt-2 inline w-full`}
          type="submit"
          disabled={!canSubmit}
        >
          SignUp
        </Button>
        <Button className="mt-2 block w-full" href={"/"}>
          Back to HomePage
        </Button>
      </form>
      <div>{error && error}</div>
    </FormProvider>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
// eslint-disable-next-line import/no-unused-modules
export default SignUp;
