import { supabase } from "lib/supabase/client";
import Button from "components/Atoms/Button/Button";
import Input from "components/Molecules/Inputs/Input";
import Dialog from "components/Atoms/Dialog/DialogBox";
import * as Portal from "@radix-ui/react-portal";

import { useState } from "react";
import { useLockBodyScroll } from "react-use";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, AnyObjectSchema } from "yup";
import clsx from "clsx";

const validation = object({
  email: string().required().email(),
});

type Inputs = {
  email: string;
};

// eslint-disable-next-line import/no-unused-modules
const Auth = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const methods = useForm<{ email: string }>({
    mode: "onTouched",
    resolver: yupResolver<AnyObjectSchema>(validation),
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const canSubmit = isDirty && isValid;

  useLockBodyScroll();

  const handleLogin: SubmitHandler<Inputs> = ({ email }) => {
    setLoading(true);
    supabase.auth
      .signInWithOtp({ email, options: { data: { new: true } } })
      .then(({ error }) => {
        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Check your email for the login link!");
        }
        setLoading(false);
      });
  };

  return (
    <Portal.Root className="w-screen h-screen  backdrop-blur-lg animate-fadeIn fixed inset-0 z-50 flex justify-center items-center">
      <Dialog
        onClose={close}
        className="animate-scaleIn"
        kreiselClassName={clsx({ "animate-spin": loading })}
      >
        <div>{message}</div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleLogin)}>
            <Input name="email" placeholder="Email" />
            <Button
              className={`mt-2 inline w-full`}
              type="submit"
              disabled={!canSubmit}
            >
              Login / SignUp
            </Button>
          </form>
          <button onClick={() => {}}></button>
        </FormProvider>
      </Dialog>
    </Portal.Root>
  );
};

export default Auth;
